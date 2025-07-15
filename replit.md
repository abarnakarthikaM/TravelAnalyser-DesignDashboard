# Travel Expense Dashboard

## Overview

This is a full-stack web application for managing and analyzing corporate travel expenses. It features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data storage through Drizzle ORM. The application provides a comprehensive dashboard for tracking expenses across categories like air travel, hotel stays, and ground transportation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom INFINITI brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Development**: Hot reload with Vite middleware integration
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Data Storage
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation with sample data
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon Database serverless driver for PostgreSQL

## Key Components

### Database Schema
- **Users**: Authentication and role management
- **Expenses**: Core expense tracking with categories, amounts, and dates
- **Vendors**: Vendor management for expense categorization
- **Schema Validation**: Zod schemas for runtime type checking

### API Endpoints
- `GET /api/dashboard/metrics` - Dashboard overview statistics
- `GET /api/expenses` - List all expenses
- `GET /api/vendors` - List all vendors

### Frontend Components
- **Dashboard**: Main interface with metrics cards, charts, and expense lists
- **Sidebar**: INFINITI-branded navigation with multiple view options
- **Charts**: Interactive expense breakdown and trend visualization
- **Responsive Design**: Mobile-first approach with breakpoint handling

## Data Flow

1. **Client Request**: Frontend makes API calls using React Query
2. **API Processing**: Express routes handle requests and call storage layer
3. **Data Storage**: Currently uses in-memory storage, designed for PostgreSQL migration
4. **Response**: JSON data returned to client for rendering
5. **State Management**: React Query handles caching, loading states, and error handling

## External Dependencies

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Data Visualization
- **Recharts**: React charting library for expense analytics
- **Chart Types**: Bar charts for trends, pie charts for distribution

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the entire stack
- **ESLint**: Code quality and consistency

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Production**: Single Node.js server serves both API and static files

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reload
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run db:push` - Database schema migration

### Architecture Notes
- **Monorepo Structure**: Shared types and schemas in `/shared` directory
- **Path Aliases**: TypeScript path mapping for clean imports
- **CORS Ready**: Express configured for cross-origin requests
- **Error Boundaries**: Comprehensive error handling on both client and server
- **Type Safety**: End-to-end TypeScript with shared interfaces

The application is designed to scale from the current in-memory storage to a full PostgreSQL deployment with minimal code changes, thanks to the abstracted storage interface and Drizzle ORM integration.