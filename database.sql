-- Create the database
CREATE DATABASE IF NOT EXISTS finance_pro_tricks;
USE finance_pro_tricks;

-- Users table with subscription levels
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('admin', 'premium', 'freemium') DEFAULT 'freemium',
    subscription_status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
    subscription_start_date DATE,
    subscription_end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Settings table
CREATE TABLE admin_settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subscription Plans table
CREATE TABLE subscription_plans (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    plan_name VARCHAR(50) NOT NULL,
    plan_type ENUM('freemium', 'premium') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration_days INT NOT NULL,
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Activity Logs table
CREATE TABLE user_activity_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Premium Features table
CREATE TABLE premium_features (
    feature_id INT PRIMARY KEY AUTO_INCREMENT,
    feature_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Feature Access table
CREATE TABLE user_feature_access (
    access_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    feature_id INT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES premium_features(feature_id) ON DELETE CASCADE
);

-- Categories table for transactions
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    description TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type ENUM('checking', 'savings', 'credit', 'investment', 'other') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    description TEXT,
    type ENUM('income', 'expense', 'transfer') NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Budgets table
CREATE TABLE budgets (
    budget_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Goals table
CREATE TABLE goals (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0.00,
    start_date DATE NOT NULL,
    target_date DATE NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert default subscription plans
INSERT INTO subscription_plans (plan_name, plan_type, price, duration_days, features) VALUES
('Free Plan', 'freemium', 0.00, 365, 'Basic financial tracking, Limited categories, Basic reports'),
('Premium Plan', 'premium', 9.99, 30, 'Advanced financial tracking, All categories, Advanced reports, Goal tracking, Budget planning, Investment tracking');

-- Insert default premium features
INSERT INTO premium_features (feature_name, description) VALUES
('Advanced Reports', 'Detailed financial analysis and custom reports'),
('Investment Tracking', 'Track and analyze investment portfolios'),
('Goal Planning', 'Set and track financial goals'),
('Budget Planning', 'Advanced budget planning and forecasting'),
('Multiple Accounts', 'Manage multiple financial accounts'),
('Export Data', 'Export financial data in various formats'),
('Custom Categories', 'Create custom transaction categories'),
('Financial Insights', 'AI-powered financial insights and recommendations');

-- Insert default categories
INSERT INTO categories (name, type, description, is_premium) VALUES
('Salary', 'income', 'Regular employment income', FALSE),
('Freelance', 'income', 'Income from freelance work', FALSE),
('Investments', 'income', 'Income from investments', TRUE),
('Food & Dining', 'expense', 'Groceries and restaurant expenses', FALSE),
('Housing', 'expense', 'Rent, mortgage, and housing-related expenses', FALSE),
('Transportation', 'expense', 'Car payments, fuel, and public transport', FALSE),
('Utilities', 'expense', 'Electricity, water, gas, and other utilities', FALSE),
('Entertainment', 'expense', 'Movies, games, and other entertainment', FALSE),
('Healthcare', 'expense', 'Medical expenses and insurance', FALSE),
('Shopping', 'expense', 'General shopping expenses', FALSE),
('Education', 'expense', 'Tuition, books, and educational expenses', FALSE),
('Savings', 'expense', 'Money set aside for savings', FALSE),
('Investment Expenses', 'expense', 'Fees and expenses related to investments', TRUE),
('Tax Deductions', 'expense', 'Tax-deductible expenses', TRUE),
('Other Income', 'income', 'Miscellaneous income sources', FALSE),
('Other Expense', 'expense', 'Miscellaneous expenses', FALSE); 