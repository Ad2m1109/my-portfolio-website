// Service Worker for Portfolio PWA
const CACHE_NAME = 'adem-portfolio-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const CACHE_URLS = [
    '/',
    '/static/style.css',
    '/static/main.js',
    '/static/projects.js',
    '/offline.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell...');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('App shell cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Cache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip Chrome extension requests
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    // Handle navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // If successful, update cache and return response
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseClone));
                    return response;
                })
                .catch(() => {
                    // If offline, serve cached version or offline page
                    return caches.match(event.request)
                        .then(cachedResponse => {
                            return cachedResponse || caches.match(OFFLINE_URL);
                        });
                })
        );
        return;
    }

    // Handle all other requests with cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cache successful responses
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback for images
                        if (event.request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image unavailable</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        // For other resources, return a generic offline response
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync for contact form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        console.log('Background sync: contact form');
        event.waitUntil(syncContactForm());
    }
});

// Handle background sync for contact forms
async function syncContactForm() {
    try {
        // Get stored form submissions from IndexedDB
        const submissions = await getStoredSubmissions();
        
        for (const submission of submissions) {
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submission.data)
                });

                if (response.ok) {
                    // Remove successful submission from storage
                    await removeSubmission(submission.id);
                    console.log('Contact form synced successfully');
                    
                    // Notify user of successful sync
                    self.registration.showNotification('Message Sent!', {
                        body: 'Your contact form was submitted successfully.',
                        icon: '/static/images/icon-192.png',
                        tag: 'contact-success'
                    });
                }
            } catch (error) {
                console.error('Failed to sync contact form:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Handle push notifications
self.addEventListener('push', event => {
    console.log('Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/static/images/icon-192.png',
        badge: '/static/images/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'view',
                title: 'View Portfolio'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Adem Portfolio', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event.action);
    
    event.notification.close();

    if (event.action === 'view' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Handle notification close
self.addEventListener('notificationclose', event => {
    console.log('Notification closed');
    
    // Track notification close for analytics
    event.waitUntil(
        self.registration.sync.register('notification-close')
    );
});

// Utility functions for IndexedDB operations
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PortfolioSW', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('submissions')) {
                db.createObjectStore('submissions', { keyPath: 'id' });
            }
        };
    });
}

async function getStoredSubmissions() {
    try {
        const db = await openDB();
        const transaction = db.transaction(['submissions'], 'readonly');
        const store = transaction.objectStore('submissions');
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    } catch (error) {
        console.error('Failed to get stored submissions:', error);
        return [];
    }
}

async function removeSubmission(id) {
    try {
        const db = await openDB();
        const transaction = db.transaction(['submissions'], 'readwrite');
        const store = transaction.objectStore('submissions');
        
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    } catch (error) {
        console.error('Failed to remove submission:', error);
    }
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_UPDATE') {
        // Update cache with new content
        event.waitUntil(updateCache());
    }
});

async function updateCache() {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(CACHE_URLS);
        console.log('Cache updated successfully');
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

// Periodic background sync for updates
self.addEventListener('periodicsync', event => {
    if (event.tag === 'portfolio-update') {
        event.waitUntil(checkForUpdates());
    }
});

async function checkForUpdates() {
    try {
        // Check for portfolio updates
        const response = await fetch('/api/version');
        if (response.ok) {
            const data = await response.json();
            // Compare version and update if needed
            console.log('Version check completed:', data);
        }
    } catch (error) {
        console.error('Update check failed:', error);
    }
}

console.log('Service Worker loaded successfully');