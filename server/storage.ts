import { users, expenses, vendors, type User, type InsertUser, type Expense, type InsertExpense, type Vendor, type InsertVendor } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getExpenses(): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  getVendors(): Promise<Vendor[]>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  getDashboardMetrics(): Promise<{
    totalExpenses: number;
    airTravel: number;
    hotelStays: number;
    groundTransport: number;
    monthlyData: Array<{ month: string; amount: number }>;
    categoryDistribution: Array<{ category: string; amount: number; percentage: number }>;
    topExpenses: Expense[];
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private expenses: Map<number, Expense>;
  private vendors: Map<number, Vendor>;
  private currentUserId: number;
  private currentExpenseId: number;
  private currentVendorId: number;

  constructor() {
    this.users = new Map();
    this.expenses = new Map();
    this.vendors = new Map();
    this.currentUserId = 1;
    this.currentExpenseId = 1;
    this.currentVendorId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "johndoe",
      password: "password",
      name: "John Doe",
      role: "Admin"
    };
    this.users.set(1, sampleUser);
    this.currentUserId = 2;

    // Create sample vendors
    const sampleVendors: Vendor[] = [
      { id: 1, name: "AirCorp", category: "Air Travel" },
      { id: 2, name: "GlobalStay", category: "Hotel Stays" },
      { id: 3, name: "RideShare", category: "Ground Transport" },
      { id: 4, name: "TravelEase", category: "Hotel Stays" }
    ];

    sampleVendors.forEach(vendor => {
      this.vendors.set(vendor.id, vendor);
    });
    this.currentVendorId = 5;

    // Create sample expenses
    const sampleExpenses: Expense[] = [
      {
        id: 1,
        date: new Date("2023-11-15"),
        description: "AirCorp Flight",
        category: "Air Travel",
        amount: "245.50",
        userId: 1
      },
      {
        id: 2,
        date: new Date("2023-11-14"),
        description: "GlobalStay Hotel",
        category: "Hotel Stays",
        amount: "180.00",
        userId: 1
      },
      {
        id: 3,
        date: new Date("2023-11-14"),
        description: "RideShare Cab",
        category: "Ground Transport",
        amount: "32.50",
        userId: 1
      },
      {
        id: 4,
        date: new Date("2023-11-13"),
        description: "TravelEase Hotel",
        category: "Hotel Stays",
        amount: "210.00",
        userId: 1
      },
      {
        id: 5,
        date: new Date("2023-11-13"),
        description: "AirCorp Flight",
        category: "Air Travel",
        amount: "310.20",
        userId: 1
      }
    ];

    sampleExpenses.forEach(expense => {
      this.expenses.set(expense.id, expense);
    });
    this.currentExpenseId = 6;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.currentExpenseId++;
    const expense: Expense = { ...insertExpense, id };
    this.expenses.set(id, expense);
    return expense;
  }

  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = this.currentVendorId++;
    const vendor: Vendor = { ...insertVendor, id };
    this.vendors.set(id, vendor);
    return vendor;
  }

  async getDashboardMetrics() {
    const expenses = Array.from(this.expenses.values());
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const airTravel = expenses.filter(e => e.category === "Air Travel").reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const hotelStays = expenses.filter(e => e.category === "Hotel Stays").reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const groundTransport = expenses.filter(e => e.category === "Ground Transport").reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    // Mock monthly data for chart
    const monthlyData = [
      { month: "Jan", amount: 56000 },
      { month: "Feb", amount: 69000 },
      { month: "Mar", amount: 45000 },
      { month: "Apr", amount: 71000 },
      { month: "May", amount: 55000 }
    ];

    // Calculate category distribution
    const categoryTotals = {
      "Air Travel": airTravel,
      "Hotel Stays": hotelStays,
      "Ground Transport": groundTransport
    };

    const categoryDistribution = Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / totalExpenses) * 100)
    }));

    // Get top 5 expenses
    const topExpenses = expenses
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      .slice(0, 5);

    return {
      totalExpenses: 1248567,
      airTravel: 567890,
      hotelStays: 432156,
      groundTransport: 248521,
      monthlyData,
      categoryDistribution,
      topExpenses
    };
  }
}

export const storage = new MemStorage();
