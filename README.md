# 🏗️ Microservices Architecture with Clean Architecture, DDD & TDD

A comprehensive showcase of building Node.js microservices using **Clean Architecture**, **Domain-Driven Design (DDD)**, and **Test-Driven Development (TDD)** principles.

## 🎯 Project Overview

This repository demonstrates how to build scalable, maintainable, and testable microservices using modern software engineering practices. Each service follows clean architecture principles with clear separation of concerns, domain-driven design for business logic organization, and comprehensive test coverage through TDD.

## 🏛️ Architecture Principles

### Clean Architecture
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Separation of Concerns**: Clear boundaries between layers
- **Independence**: Business logic is independent of frameworks, databases, and external agencies

### Domain-Driven Design (DDD)
- **Domain Models**: Rich business objects with behavior
- **Bounded Contexts**: Clear boundaries for each service
- **Ubiquitous Language**: Shared vocabulary between developers and domain experts

### Test-Driven Development (TDD)
- **Red-Green-Refactor**: Write failing tests first, then implement, then refactor
- **High Test Coverage**: Comprehensive unit and integration tests
- **Testable Design**: Architecture that promotes testability

## 📁 Project Structure

```
MicroService/
├── catalog_service/          # Product catalog microservice
│   ├── src/
│   │   ├── api/             # Presentation layer (Controllers/Routes)
│   │   ├── services/        # Application layer (Use Cases)
│   │   ├── repository/      # Infrastructure layer (Data Access)
│   │   ├── models/          # Domain layer (Entities/Value Objects)
│   │   ├── interface/       # Contracts/Interfaces
│   │   ├── expressApp.ts    # Express application setup
│   │   └── server.ts        # Server entry point
│   ├── jest.config.ts       # Jest testing configuration
│   ├── package.json         # Dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration
├── order_service/           # Order management microservice (in development)
└── README.md               # This file
```

## 🚀 Services

### Catalog Service
A product catalog microservice that demonstrates:
- **Clean Architecture Layers**:
  - **API Layer**: Express routes and controllers
  - **Service Layer**: Business logic and use cases
  - **Repository Layer**: Data access abstraction
  - **Domain Layer**: Product entities and business rules

- **Key Features**:
  - Product management (CRUD operations)
  - Domain-driven product modeling
  - Repository pattern for data access
  - Comprehensive test coverage
  - TypeScript for type safety

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Testing**: Jest + Supertest
- **Architecture**: Clean Architecture + DDD
- **Development**: TDD approach

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tareq-Ghassan/MicroServices-Clean-Architecture.git
   cd MicroService
   ```

2. **Install dependencies for catalog service**
   ```bash
   cd catalog_service
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## 🧪 Testing Strategy

### Test-Driven Development (TDD) Workflow
1. **Red**: Write a failing test that describes the desired behavior
2. **Green**: Write the minimum code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

### Test Coverage
- **Unit Tests**: Test individual functions and classes in isolation
- **Integration Tests**: Test the interaction between components
- **API Tests**: Test HTTP endpoints using Supertest

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🏗️ Clean Architecture Implementation

### Layer Responsibilities

#### 1. API Layer (`src/api/`)
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Route definition
  - Request validation
  - Response formatting
  - Error handling

#### 2. Service Layer (`src/services/`)
- **Purpose**: Implement business logic and use cases
- **Responsibilities**:
  - Business rules enforcement
  - Orchestration of domain objects
  - Transaction management
  - Application-specific logic

#### 3. Repository Layer (`src/repository/`)
- **Purpose**: Abstract data access
- **Responsibilities**:
  - Data persistence operations
  - Query optimization
  - Database abstraction
  - Caching strategies

#### 4. Domain Layer (`src/models/`)
- **Purpose**: Core business logic and entities
- **Responsibilities**:
  - Business entities
  - Value objects
  - Domain services
  - Business rules

#### 5. Interface Layer (`src/interface/`)
- **Purpose**: Define contracts and abstractions
- **Responsibilities**:
  - Repository interfaces
  - Service contracts
  - Dependency injection contracts

## 🔄 Domain-Driven Design (DDD) Implementation

### Bounded Contexts
Each microservice represents a bounded context with:
- **Clear boundaries**: Well-defined service responsibilities
- **Ubiquitous language**: Consistent terminology within the context
- **Domain models**: Rich objects that encapsulate business logic

### Domain Models
- **Entities**: Objects with identity (e.g., Product)
- **Value Objects**: Immutable objects without identity
- **Domain Services**: Business logic that doesn't belong to entities
- **Aggregates**: Clusters of related entities

## 📋 API Documentation

### Catalog Service Endpoints

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 🚀 Development Workflow

### 1. Feature Development (TDD)
```bash
# 1. Write failing test
# 2. Implement minimum code to pass
# 3. Refactor while keeping tests green
npm test -- --watch
```

### 2. Code Quality
- **TypeScript**: Static type checking
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **Jest**: Testing framework

### 3. Git Workflow
- Feature branches for new development
- Pull requests with code review
- Continuous integration with automated tests

## 📈 Best Practices Demonstrated

### Clean Code
- **Single Responsibility Principle**: Each class has one reason to change
- **Open/Closed Principle**: Open for extension, closed for modification
- **Dependency Inversion**: Depend on abstractions, not concretions

### SOLID Principles
- **S**: Single Responsibility Principle
- **O**: Open/Closed Principle  
- **L**: Liskov Substitution Principle
- **I**: Interface Segregation Principle
- **D**: Dependency Inversion Principle

### Testing Best Practices
- **Arrange-Act-Assert**: Clear test structure
- **Test Isolation**: Each test is independent
- **Meaningful Test Names**: Describe the behavior being tested
- **Mock External Dependencies**: Focus on unit under test

## 🔮 Future Enhancements

### Planned Services
- **Order Service**: Order management and processing
- **User Service**: User authentication and authorization
- **Payment Service**: Payment processing and transactions
- **Notification Service**: Event-driven notifications

### Infrastructure Improvements
- **Docker**: Containerization for consistent deployment
- **Kubernetes**: Orchestration and scaling
- **Message Queues**: Asynchronous communication
- **API Gateway**: Centralized routing and authentication
- **Monitoring**: Observability and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow TDD approach (write tests first)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Clean Architecture** by Robert C. Martin
- **Domain-Driven Design** by Eric Evans
- **Test-Driven Development** by Kent Beck
- **Node.js** and **Express.js** communities

---

**Happy Coding! 🚀**

*This project serves as a learning resource for implementing clean architecture, DDD, and TDD in Node.js microservices.* 
