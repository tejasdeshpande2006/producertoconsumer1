# Producer To Consumer (P2C) - Presentation Content

---

## a) Project Title Slide

### **Producer To Consumer (P2C)**
#### A Direct Farm-to-Consumer E-Commerce Platform

**Bridging the Gap Between Producers and Consumers**

- Eliminating Middlemen
- Real-Time Order Tracking
- Digital Wallet Integration
- AI-Powered Product Management

**Presented by:** [Your Name]  
**Course:** [Course Name]  
**Academic Year:** 2025-26

---

## b) Abstract

**Producer To Consumer (P2C)** is a comprehensive full-stack web application designed to create a direct marketplace connecting producers (farmers/manufacturers) with end consumers, eliminating intermediaries and ensuring fair pricing for both parties.

The platform features a **multi-role authentication system** supporting four user types: Consumers, Producers, Delivery Personnel, and Administrators. Built using **React.js** with **TypeScript** for the frontend and **Firebase/Firestore** for the backend, the application provides real-time data synchronization, secure wallet-based transactions, and **AI-powered product description generation** using Google Gemini API.

Key features include:
- Real-time order tracking with **geolocation-based delivery monitoring**
- **Digital wallet system** with UPI payment integration
- **Offline-first architecture** for seamless user experience
- Role-based dashboards with verification workflows
- Product reviews and wishlist functionality

The system ensures transparency, reduces costs, and promotes sustainable commerce by connecting producers directly with consumers.

---

## c) Introduction

### Background
Traditional supply chains involve multiple intermediaries between producers and consumers, leading to increased prices for consumers and reduced profits for producers. The agriculture and small-scale manufacturing sectors particularly suffer from this inefficiency.

### Problem Statement
- Producers receive only a fraction of the final selling price
- Consumers pay inflated prices due to middlemen markups
- Lack of transparency in product sourcing and pricing
- Limited access for small producers to reach wider markets
- Inefficient delivery and order tracking systems

### Solution
**Producer To Consumer (P2C)** addresses these challenges by:
1. Creating a direct digital marketplace
2. Implementing transparent pricing mechanisms
3. Providing real-time order and delivery tracking
4. Enabling secure digital payments through wallet system
5. Leveraging AI for efficient product management
6. Supporting offline browsing for accessibility

### Technology Stack Overview
- **Frontend:** React.js 19, TypeScript, Tailwind CSS 4.x
- **Backend:** Express.js, Node.js
- **Database:** Firebase Firestore (Real-time NoSQL)
- **Authentication:** Firebase Authentication
- **AI Integration:** Google Gemini API
- **Mapping:** Leaflet.js for real-time tracking

---

## d) Objectives

### Primary Objectives
1. **Direct Marketplace Creation** - Build a platform enabling producers to sell directly to consumers without intermediaries
2. **Multi-Role User Management** - Implement a comprehensive authentication system supporting Consumers, Producers, Delivery Personnel, and Administrators
3. **Secure Transaction System** - Develop a digital wallet with UPI integration for safe and seamless payments

### Secondary Objectives
4. **Real-Time Order Tracking** - Enable consumers to track their orders with live delivery personnel location updates
5. **AI-Powered Assistance** - Integrate Google Gemini AI for automated product description generation and category suggestions
6. **Offline Functionality** - Implement offline-first architecture using IndexedDB for product browsing without internet
7. **Admin Verification System** - Create workflow for producer verification and profile change approvals
8. **Review & Rating System** - Allow consumers to review products and rate their experience

### Technical Objectives
9. **Responsive Design** - Ensure seamless experience across desktop and mobile devices
10. **Real-Time Synchronization** - Leverage Firebase for instant data updates across all connected clients
11. **Security Implementation** - Implement robust Firestore security rules for data protection
12. **Scalable Architecture** - Design system architecture for future scalability

---

## e) Scope of Project

### In Scope

#### User Management
- Multi-role registration (Consumer, Producer)
- Role-based authentication and authorization
- Profile management with admin verification for producers
- User suspension and strike system

#### E-Commerce Features
- Product catalog with search and filtering
- Shopping cart management
- Wishlist functionality
- Product reviews and ratings
- Category-based product organization

#### Payment & Wallet
- Digital wallet with balance management
- UPI QR code payment integration
- Transaction history tracking
- Wallet-based checkout process

#### Order Management
- Order placement and confirmation
- Order status tracking (Pending → Confirmed → Shipped → Delivered)
- Order cancellation and returns
- Order history for buyers

#### Delivery System
- Delivery personnel dashboard
- Real-time geolocation tracking
- Order pickup and delivery confirmation
- Online/offline status toggle

#### Administration
- Admin dashboard for user management
- Producer verification workflow
- Profile change approvals
- User suspension management
- Role assignment

#### AI Integration
- AI-generated product descriptions using Google Gemini
- Automated category and price suggestions
- Image-based product analysis

### Out of Scope
- Payment gateway integration (beyond UPI simulation)
- Inventory management automation
- Multi-language support
- Mobile native applications
- Third-party logistics integration
- SMS/Email notification system
- Advanced analytics dashboard

### Future Enhancements
- Mobile applications (iOS/Android)
- Multiple payment gateway support
- Automated inventory alerts
- Customer support chat system
- Vendor performance analytics

---

## f) Hardware / Software Requirements

### Hardware Requirements

| Component | Minimum Requirement | Recommended |
|-----------|---------------------|-------------|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 |
| RAM | 4 GB | 8 GB |
| Storage | 50 GB HDD | 100 GB SSD |
| Display | 1366 x 768 | 1920 x 1080 |
| Internet | 2 Mbps | 10+ Mbps |
| GPS | Required for delivery tracking | - |

### Software Requirements

#### Development Environment
| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.x+ | Runtime environment |
| npm | 9.x+ | Package manager |
| TypeScript | 5.8+ | Type-safe JavaScript |
| VS Code | Latest | Code editor |
| Git | 2.x+ | Version control |

#### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 19.0 | UI library |
| React Router DOM | 7.x | Client-side routing |
| Tailwind CSS | 4.x | Styling framework |
| Lucide React | 0.546+ | Icon library |
| Motion (Framer) | 12.x | Animations |
| Leaflet.js | 1.9+ | Map integration |
| QRCode.react | 4.x | QR code generation |

#### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | 4.x | Web server |
| Firebase | 12.x | Backend services |
| Firebase Admin SDK | 13.x | Server-side Firebase |
| Firestore | - | NoSQL database |
| Dexie.js | 4.x | IndexedDB wrapper |

#### AI Integration
| Technology | Version | Purpose |
|------------|---------|---------|
| Google GenAI SDK | 1.x | Gemini AI integration |

#### Build & Deployment
| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 6.x | Build tool |
| Vercel | - | Deployment platform |

#### Browser Compatibility
- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

---

## g) Requirements

### Functional Requirements

#### FR1: User Authentication
| ID | Requirement | Priority |
|----|-------------|----------|
| FR1.1 | Users shall be able to register with email and password | High |
| FR1.2 | Users shall select role (Consumer/Producer) during registration | High |
| FR1.3 | System shall authenticate users via Firebase Auth | High |
| FR1.4 | System shall redirect users to role-specific dashboards | High |
| FR1.5 | Users shall be able to logout from any page | Medium |

#### FR2: Product Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR2.1 | Verified producers shall add products with title, description, price, stock, category, and images | High |
| FR2.2 | Producers shall edit and delete their own products | High |
| FR2.3 | System shall generate AI descriptions using Google Gemini | Medium |
| FR2.4 | Consumers shall browse all products with search and filter | High |
| FR2.5 | System shall display products with pagination | Medium |

#### FR3: Shopping Cart & Wishlist
| ID | Requirement | Priority |
|----|-------------|----------|
| FR3.1 | Consumers shall add products to cart | High |
| FR3.2 | Consumers shall modify cart item quantities | Medium |
| FR3.3 | Consumers shall remove items from cart | High |
| FR3.4 | Consumers shall add/remove products from wishlist | Medium |
| FR3.5 | Cart shall persist across sessions | High |

#### FR4: Wallet & Payments
| ID | Requirement | Priority |
|----|-------------|----------|
| FR4.1 | Users shall view wallet balance | High |
| FR4.2 | Users shall add money via UPI QR code | High |
| FR4.3 | System shall deduct wallet balance during checkout | High |
| FR4.4 | System shall maintain transaction history | Medium |
| FR4.5 | System shall prevent checkout if insufficient balance | High |

#### FR5: Order Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR5.1 | Consumers shall place orders from cart | High |
| FR5.2 | Producers shall confirm/cancel orders | High |
| FR5.3 | Delivery personnel shall pick up and deliver orders | High |
| FR5.4 | Consumers shall track order status in real-time | High |
| FR5.5 | Consumers shall view order history | Medium |

#### FR6: Administration
| ID | Requirement | Priority |
|----|-------------|----------|
| FR6.1 | Admin shall view all registered users | High |
| FR6.2 | Admin shall verify/revoke producer verification | High |
| FR6.3 | Admin shall approve profile changes for producers | Medium |
| FR6.4 | Admin shall change user roles | High |
| FR6.5 | Admin shall suspend/unsuspend users | Medium |

### Non-Functional Requirements

#### NFR1: Performance
| ID | Requirement | Target |
|----|-------------|--------|
| NFR1.1 | Page load time shall be under 3 seconds | < 3s |
| NFR1.2 | Real-time updates shall appear within 500ms | < 500ms |
| NFR1.3 | System shall handle 100+ concurrent users | 100+ users |
| NFR1.4 | API response time shall be under 1 second | < 1s |

#### NFR2: Security
| ID | Requirement |
|----|-------------|
| NFR2.1 | All user passwords shall be hashed |
| NFR2.2 | Firestore rules shall enforce role-based access |
| NFR2.3 | API endpoints shall validate user authentication |
| NFR2.4 | Sensitive operations shall use server-side validation |

#### NFR3: Reliability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR3.1 | System availability | 99% uptime |
| NFR3.2 | Offline mode shall allow product browsing | - |
| NFR3.3 | Data shall sync when connection restores | - |

#### NFR4: Usability
| ID | Requirement |
|----|-------------|
| NFR4.1 | UI shall be responsive across devices |
| NFR4.2 | Interface shall follow consistent design patterns |
| NFR4.3 | Error messages shall be user-friendly |
| NFR4.4 | Loading states shall be clearly indicated |

#### NFR5: Scalability
| ID | Requirement |
|----|-------------|
| NFR5.1 | Database shall support horizontal scaling |
| NFR5.2 | Architecture shall support microservices migration |

---

## h) Architecture and Design

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Consumer  │  │   Producer  │  │   Delivery  │  │    Admin    │        │
│  │  Dashboard  │  │  Dashboard  │  │  Dashboard  │  │  Dashboard  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┼────────────────┼────────────────┘                │
│                          ▼                                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     REACT.JS + TYPESCRIPT FRONTEND                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │  │  React   │  │  React   │  │ Tailwind │  │  Motion  │              │  │
│  │  │  Router  │  │ Context  │  │   CSS    │  │ (Framer) │              │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│  ┌─────────────────────────────────┼─────────────────────────────────────┐  │
│  │                    OFFLINE STORAGE (IndexedDB/Dexie)                  │  │
│  └─────────────────────────────────┼─────────────────────────────────────┘  │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    EXPRESS.JS SERVER (Node.js)                         │  │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────┐  │  │
│  │  │   Wallet APIs    │  │   Health Check   │  │    Vite Dev Server  │  │  │
│  │  │  - Add Money     │  │     Endpoint     │  │    (Development)    │  │  │
│  │  │  - Purchase      │  │                  │  │                     │  │  │
│  │  └──────────────────┘  └──────────────────┘  └─────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
┌─────────────────────────┐  ┌───────────────┐  ┌───────────────────────┐
│    FIREBASE SERVICES    │  │  GOOGLE AI    │  │    MAPPING SERVICE    │
│  ┌───────────────────┐  │  │ ┌───────────┐ │  │  ┌─────────────────┐  │
│  │ Firebase Auth     │  │  │ │  Gemini   │ │  │  │   Leaflet.js    │  │
│  │ (Authentication)  │  │  │ │   2.0     │ │  │  │  + OpenStreet   │  │
│  └───────────────────┘  │  │ │  Flash    │ │  │  │      Maps       │  │
│  ┌───────────────────┐  │  │ └───────────┘ │  │  └─────────────────┘  │
│  │ Cloud Firestore   │  │  └───────────────┘  └───────────────────────┘
│  │ (Real-time DB)    │  │
│  │                   │  │
│  │ Collections:      │  │
│  │ - users           │  │
│  │ - products        │  │
│  │ - orders          │  │
│  │ - notifications   │  │
│  │ - transactions    │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

### Entity Relationship (ER) Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ┌─────────────────┐         ┌─────────────────┐                        │
│  │     USERS       │         │    PRODUCTS     │                        │
│  ├─────────────────┤         ├─────────────────┤                        │
│  │ PK uid          │◄────────│ FK sellerId     │                        │
│  │    name         │    1:N  │ PK id           │                        │
│  │    email        │         │    title        │                        │
│  │    phoneNumber  │         │    description  │                        │
│  │    role         │         │    price        │                        │
│  │    walletBalance│         │    stock        │                        │
│  │    isVerified   │         │    category     │                        │
│  │    isOnline     │         │    images[]     │                        │
│  │    strikes      │         │    videoUrl     │                        │
│  │    isSuspended  │         └────────┬────────┘                        │
│  │    location{}   │                  │                                  │
│  └────────┬────────┘                  │ 1:N                             │
│           │                           ▼                                  │
│           │                  ┌─────────────────┐                        │
│           │                  │    REVIEWS      │                        │
│           │                  ├─────────────────┤                        │
│           │                  │ PK id           │                        │
│           │         1:N      │ FK userId       │◄─────────┐             │
│           ├─────────────────►│ FK productId    │          │             │
│           │                  │    rating       │          │             │
│           │                  │    comment      │          │             │
│           │                  │    timestamp    │          │             │
│           │                  └─────────────────┘          │             │
│           │                                               │             │
│           │  1:N   ┌─────────────────┐                   │             │
│           ├───────►│      CART       │                   │             │
│           │        ├─────────────────┤                   │             │
│           │        │ PK id           │                   │             │
│           │        │ FK userId       │                   │             │
│           │        │ FK productId    │                   │             │
│           │        │    quantity     │                   │             │
│           │        │    title        │                   │ 1:N         │
│           │        │    price        │                   │             │
│           │        │    image        │                   │             │
│           │        └─────────────────┘                   │             │
│           │                                               │             │
│           │  1:N   ┌─────────────────┐                   │             │
│           ├───────►│    WISHLIST     │                   │             │
│           │        ├─────────────────┤                   │             │
│           │        │ PK id           │                   │             │
│           │        │ FK userId       │                   │             │
│           │        │ FK productId    │                   │             │
│           │        │    timestamp    │                   │             │
│           │        └─────────────────┘                   │             │
│           │                                               │             │
│           │  1:N   ┌───────────────────────┐             │             │
│           ├───────►│  WALLET_TRANSACTIONS  │             │             │
│           │        ├───────────────────────┤             │             │
│           │        │ PK id                 │             │             │
│           │        │ FK userId             │             │             │
│           │        │    amount             │             │             │
│           │        │    type (credit/debit)│             │             │
│           │        │    timestamp          │             │             │
│           │        │    description        │             │             │
│           │        └───────────────────────┘             │             │
│           │                                               │             │
│           │                                               │             │
│           │  1:N (as buyer)     ┌─────────────────┐      │             │
│           ├────────────────────►│     ORDERS      │      │             │
│           │  1:N (as seller)    ├─────────────────┤      │             │
│           ├────────────────────►│ PK id           │      │             │
│           │  1:N (as delivery)  │ FK buyerId      │──────┘             │
│           └────────────────────►│ FK sellerId     │                    │
│                                 │ FK deliveryBoyId│                    │
│                                 │    status       │                    │
│                                 │    totalAmount  │                    │
│                                 │    timestamp    │                    │
│                                 │    items[]      │                    │
│                                 │    shippingAddr │                    │
│                                 └─────────────────┘                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
  1:N = One-to-Many Relationship
  {} = Nested Object
  [] = Array Field
```

### Data Flow Diagram - Level 0 (Context Diagram)

```
                                    ┌─────────────────────────────────┐
                                    │                                 │
        User Credentials            │                                 │
      ───────────────────────────► │                                 │
        Login/Register Request      │                                 │
                                    │                                 │
        Product Listings            │                                 │
      ◄─────────────────────────── │                                 │
                                    │                                 │
┌──────────────┐                   │                                 │
│              │  Order Details     │      PRODUCER TO CONSUMER      │
│   CONSUMER   │ ─────────────────►│           (P2C)                 │
│              │                   │         SYSTEM                  │
│              │  Order Status      │                                 │
│              │ ◄─────────────────│                                 │
└──────────────┘                   │                                 │
                                    │                                 │
┌──────────────┐                   │                                 │
│              │  Product Data      │                                 │
│   PRODUCER   │ ─────────────────►│                                 │
│              │                   │                                 │
│              │  Order Notifications                                 │
│              │ ◄─────────────────│                                 │
└──────────────┘                   │                                 │
                                    │                                 │
┌──────────────┐                   │                                 │
│   DELIVERY   │  Location Updates │                                 │
│  PERSONNEL   │ ─────────────────►│                                 │
│              │                   │                                 │
│              │  Delivery Tasks   │                                 │
│              │ ◄─────────────────│                                 │
└──────────────┘                   │                                 │
                                    │                                 │
┌──────────────┐                   │                                 │
│              │  Admin Commands    │                                 │
│    ADMIN     │ ─────────────────►│                                 │
│              │                   │                                 │
│              │  System Reports   │                                 │
│              │ ◄─────────────────│                                 │
└──────────────┘                   │                                 │
                                    │                                 │
                                    │                                 │
        AI Prompts                  │                                 │
      ─────────────────────────────►│                                 │
                                    │                                 │
        AI Descriptions             │                                 │
      ◄─────────────────────────── │                                 │
                                    │                                 │
                                    └─────────────────────────────────┘
                                               ▲      │
                                               │      │
                                    Read/Write │      │ Real-time
                                               │      │ Sync
                                               │      ▼
                                    ┌─────────────────────────────────┐
                                    │      FIREBASE FIRESTORE         │
                                    │         (Database)              │
                                    └─────────────────────────────────┘
```

### Data Flow Diagram - Level 1

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ┌────────────┐                                                             │
│  │  EXTERNAL  │                                                             │
│  │   USERS    │                                                             │
│  └─────┬──────┘                                                             │
│        │                                                                     │
│        │ User Data                                                          │
│        ▼                                                                     │
│  ┌───────────────┐      User Profile      ┌───────────────┐                 │
│  │               │ ─────────────────────► │               │                 │
│  │   1.0         │                        │   D1: USERS   │                 │
│  │   User        │ ◄───────────────────── │   Data Store  │                 │
│  │ Authentication│    Auth Status         │               │                 │
│  │               │                        └───────────────┘                 │
│  └───────┬───────┘                               ▲                          │
│          │                                       │                          │
│          │ Auth Token                            │ User Verification        │
│          ▼                                       │                          │
│  ┌───────────────┐                        ┌──────┴────────┐                 │
│  │               │                        │               │                 │
│  │   2.0         │  Product CRUD          │   5.0         │                 │
│  │   Product     │ ◄────────────────────► │   Admin       │                 │
│  │  Management   │                        │  Management   │                 │
│  │               │                        │               │                 │
│  └───────┬───────┘                        └───────────────┘                 │
│          │                                       ▲                          │
│          │ Product Data                          │                          │
│          ▼                                       │                          │
│  ┌───────────────┐                               │                          │
│  │  D2: PRODUCTS │                               │                          │
│  │   Data Store  │───────────────────────────────┘                          │
│  └───────┬───────┘         Product Reports                                  │
│          │                                                                   │
│          │ Product Info                                                     │
│          ▼                                                                   │
│  ┌───────────────┐      Order Items       ┌───────────────┐                 │
│  │               │ ─────────────────────► │               │                 │
│  │   3.0         │                        │  D3: ORDERS   │                 │
│  │   Order       │ ◄───────────────────── │   Data Store  │                 │
│  │  Processing   │    Order Status        │               │                 │
│  │               │                        └───────┬───────┘                 │
│  └───────┬───────┘                                │                         │
│          │                                        │                         │
│          │ Transaction Data                       │ Delivery Tasks          │
│          ▼                                        ▼                         │
│  ┌───────────────┐                        ┌───────────────┐                 │
│  │               │      Wallet Update     │               │                 │
│  │   4.0         │ ─────────────────────► │   6.0         │                 │
│  │   Wallet &    │                        │   Delivery    │                 │
│  │  Transaction  │ ◄───────────────────── │   Tracking    │                 │
│  │  Processing   │    Delivery Confirm    │               │                 │
│  │               │                        └───────┬───────┘                 │
│  └───────┬───────┘                                │                         │
│          │                                        │ Location Updates        │
│          │ Transaction Record                     │                         │
│          ▼                                        ▼                         │
│  ┌───────────────────────┐                ┌───────────────┐                 │
│  │ D4: WALLET_TRANSACTIONS│               │  D1: USERS    │                 │
│  │      Data Store        │               │ (Location)    │                 │
│  └────────────────────────┘               └───────────────┘                 │
│                                                                              │
│  ┌───────────────┐                                                          │
│  │   7.0         │  Product Images/Title                                    │
│  │    AI        │ ─────────────────────────────────►  ┌─────────────┐      │
│  │  Description │                                     │  GOOGLE     │      │
│  │  Generator   │ ◄─────────────────────────────────  │  GEMINI AI  │      │
│  │              │  Generated Description/Category     │             │      │
│  └──────────────┘                                     └─────────────┘      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Process Legend:
  1.0 - User Authentication: Handles login, registration, session management
  2.0 - Product Management: CRUD operations for products
  3.0 - Order Processing: Cart, checkout, order creation
  4.0 - Wallet & Transaction: Payment processing, balance management
  5.0 - Admin Management: User verification, role management
  6.0 - Delivery Tracking: Real-time location, delivery status
  7.0 - AI Description Generator: Gemini API integration
```

---

## i) Working Module Details

### Module 1: User Authentication & Authorization

**Description:** Handles user registration, login, logout, and role-based access control.

**Key Features:**
- Email/Password authentication via Firebase Auth
- Role selection during registration (Consumer/Producer)
- Protected routes based on user roles
- Session persistence and management
- Auto-redirect to role-specific dashboards

**Files:**
- `src/context/AuthContext.tsx` - Auth state management
- `src/pages/Login.tsx` - Login interface
- `src/pages/Register.tsx` - Registration interface
- `src/App.tsx` - Route protection logic

---

### Module 2: Product Management (Producer Dashboard)

**Description:** Enables verified producers to manage their product inventory.

**Key Features:**
- Add new products with images, description, price, stock, and category
- AI-powered description generation using Google Gemini
- Edit existing products
- Delete products
- View incoming orders
- Order confirmation and shipment

**Files:**
- `src/pages/ProducerDashboard.tsx` - Producer interface
- `src/types.ts` - Product type definitions

---

### Module 3: Consumer Shopping Experience

**Description:** Provides consumers with browsing, cart, and purchase capabilities.

**Key Features:**
- Product catalog with search and filtering
- Pagination for product listing
- Product detail view with reviews
- Add to cart / wishlist
- Checkout with wallet payment
- Offline product browsing

**Files:**
- `src/pages/Home.tsx` - Product catalog
- `src/pages/ProductDetails.tsx` - Product details
- `src/pages/Cart.tsx` - Shopping cart
- `src/pages/Wishlist.tsx` - Wishlist management
- `src/services/offlineDb.ts` - Offline storage

---

### Module 4: Digital Wallet System

**Description:** Manages user wallet balance and transaction processing.

**Key Features:**
- View current wallet balance
- Add money via UPI QR code
- Transaction history
- Wallet-based checkout
- Server-side transaction processing

**Files:**
- `src/pages/Wallet.tsx` - Wallet interface
- `src/pages/TransactionHistory.tsx` - Transaction logs
- `server.ts` - API endpoints (/api/wallet/addMoney, /api/wallet/purchase)

---

### Module 5: Order Management & Tracking

**Description:** Handles the complete order lifecycle from placement to delivery.

**Key Features:**
- Order placement from cart
- Order status tracking (Pending → Confirmed → Shipped → Delivered)
- Real-time order updates
- Order history for buyers
- Order cancellation and returns

**Status Flow:**
```
Pending → Confirmed (by Producer) → Shipped (by Delivery) → Delivered
    ↓          ↓
Cancelled   Cancelled
                                               ↓
                                          Returned
```

**Files:**
- `src/pages/OrderHistory.tsx` - Order list
- `src/pages/OrderTracking.tsx` - Live tracking

---

### Module 6: Delivery Management

**Description:** Enables delivery personnel to manage pickups and deliveries.

**Key Features:**
- View available orders for pickup
- Accept delivery assignments
- Real-time location sharing (every 5 seconds)
- Mark orders as delivered
- Online/Offline status toggle
- Geolocation integration

**Files:**
- `src/pages/DeliveryDashboard.tsx` - Delivery interface
- `src/components/GeolocationTracker.tsx` - Location updates

---

### Module 7: Admin Dashboard

**Description:** Provides administrative control over the platform.

**Key Features:**
- View all registered users
- Search and filter users by role
- Verify/revoke producer verification
- Approve profile changes for producers/delivery
- Change user roles
- Suspend/unsuspend users
- View user statistics

**Files:**
- `src/pages/AdminDashboard.tsx` - Admin interface

---

### Module 8: Reviews & Ratings

**Description:** Allows consumers to review and rate products.

**Key Features:**
- Star rating (1-5)
- Text comments
- Display average rating on products
- User-specific review management

**Files:**
- `src/pages/ProductDetails.tsx` - Reviews section
- `src/types.ts` - Review type definition

---

### Module 10: Image & Video Upload System

**Description:** Handles product media uploads using Base64 encoding directly stored in Firestore.

**Image Upload Process:**
```
┌─────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  User selects   │ ───► │  FileReader API  │ ───► │  Base64 String     │
│  image file(s)  │      │  readAsDataURL() │      │  (data:image/...)  │
└─────────────────┘      └──────────────────┘      └─────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌────────────────────┐
                                                   │  Stored in React   │
                                                   │  State (images[])  │
                                                   └─────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌────────────────────┐
                                                   │  Saved to Firestore│
                                                   │  products.images[] │
                                                   └────────────────────┘
```

**Video Upload Process:**
```
┌─────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  User selects   │ ───► │  Size Check      │ ───► │  FileReader API    │
│  video file     │      │  (< 800KB only)  │      │  readAsDataURL()   │
└─────────────────┘      └──────────────────┘      └─────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌────────────────────┐
                                                   │  Base64 String     │
                                                   │  (data:video/...)  │
                                                   └─────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌────────────────────┐
                                                   │  Saved to Firestore│
                                                   │  products.videoUrl │
                                                   └────────────────────┘
```

**AI Integration with Images:**
```
┌─────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│  Base64 Images  │ ───► │  Google Gemini   │ ───► │  AI Returns:       │
│  (up to 3)      │      │  2.0 Flash API   │      │  - Description     │
└─────────────────┘      └──────────────────┘      │  - Category        │
                                                   │  - Price suggestion│
                                                   │  - Tags            │
                                                   └────────────────────┘
```

**Key Features:**
- Client-side Base64 encoding using FileReader API
- Multiple image upload support (stored as array)
- Single video upload per product
- Video size validation (< 800KB due to Firestore limits)
- AI-powered image analysis for product suggestions
- No external cloud storage dependency

**Technical Specifications:**

| Aspect | Images | Videos |
|--------|--------|--------|
| Storage Method | Base64 in Firestore | Base64 in Firestore |
| Size Limit | No explicit limit | < 800KB |
| Database Field | `products.images[]` | `products.videoUrl` |
| Multiple Files | ✅ Yes (array) | ❌ Single only |
| AI Analysis | ✅ Sent to Gemini | ❌ Not analyzed |

**Upload Code Flow:**
1. User selects file(s) via `<input type="file">`
2. `FileReader.readAsDataURL(file)` converts file to Base64 string
3. Base64 string stored in React component state
4. On form submission → Data saved to Firestore `products` collection

**Files:**
- `src/pages/ProducerDashboard.tsx` - Upload handlers (`handleImageUpload`, `handleVideoUpload`)

**Current Limitations:**
- No Firebase Cloud Storage integration (files stored as Base64 in documents)
- Firestore document size limit (~1MB) restricts large media files
- No image compression or optimization
- No CDN for optimized media delivery

---

### Module 9: Offline Support

**Description:** Enables product browsing without internet connectivity.

**Key Features:**
- Cache products in IndexedDB using Dexie.js
- Automatic sync when online
- Offline indicator in UI
- Graceful fallback for offline users

**Files:**
- `src/services/offlineDb.ts` - IndexedDB operations
- `src/hooks/useOnlineStatus.ts` - Network status hook

---

### Module Summary Table

| Module | User Roles | Key Technology | Database Collections |
|--------|------------|----------------|---------------------|
| Authentication | All | Firebase Auth | users |
| Product Management | Producer, Admin | React, Gemini AI | products, reviews |
| Shopping | Consumer | React, Firestore | cart, wishlist |
| Wallet | Consumer, Producer | Express.js, Firestore | walletTransactions |
| Orders | All | Firestore Real-time | orders |
| Delivery | Delivery Personnel | Leaflet.js, Geolocation | orders, users |
| Admin | Admin | React, Firestore | users |
| Reviews | Consumer | Firestore | reviews (subcollection) |
| Offline | Consumer | Dexie.js/IndexedDB | Local cache |
| Image/Video Upload | Producer | FileReader API, Base64 | products (images[], videoUrl) |

---

## Additional Notes for Presentation

### Key Differentiators
1. **Direct Trade Model** - No middlemen fees
2. **AI Integration** - Smart product descriptions
3. **Real-Time Tracking** - Live delivery updates
4. **Offline-First** - Works without internet
5. **Multi-Role System** - Comprehensive user management

### Demo Flow Suggestion
1. Consumer registration → Browse products → Add to cart → Checkout
2. Producer login → View orders → Confirm order
3. Delivery login → Pick up order → Track live → Deliver
4. Admin login → Verify producer → Manage users

---

*Document prepared for academic presentation purposes*
