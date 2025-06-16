-- Create the featured_courses table
CREATE TABLE featured_courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    classes INT NOT NULL,
    students INT NOT NULL,
    img_src VARCHAR(255) NOT NULL,
    best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert mock data from the Featured component
INSERT INTO featured_courses (title, instructor, rating, price, classes, students, img_src, best_seller) VALUES
('Financial Planning Fundamentals', 'Robert Morgan', 4.4, 20.00, 12, 150, '/images/featured/feat1.jpg', TRUE),
('Investment Strategies for Beginners', 'Sarah Johnson', 4.5, 20.00, 12, 130, '/images/featured/feat2.jpg', TRUE),
('Retirement Planning Masterclass', 'Michael Chen', 5.0, 20.00, 12, 120, '/images/featured/feat1.jpg', TRUE),
('Tax Optimization Strategies', 'Emily Rodriguez', 4.3, 20.00, 10, 95, '/images/featured/feat2.jpg', FALSE),
('Stock Market Analysis', 'David Williams', 4.7, 20.00, 14, 165, '/images/featured/feat1.jpg', TRUE),
('Real Estate Investment', 'Jennifer Lee', 4.6, 20.00, 12, 110, '/images/featured/feat2.jpg', FALSE);

-- Additional mock data to expand the dataset
INSERT INTO featured_courses (title, instructor, rating, price, classes, students, img_src, best_seller) VALUES
('Cryptocurrency Fundamentals', 'Alex Turner', 4.8, 25.00, 15, 180, '/images/featured/feat1.jpg', TRUE),
('Personal Budget Management', 'Sophia Martinez', 4.2, 15.00, 8, 210, '/images/featured/feat2.jpg', TRUE),
('Advanced Stock Trading Techniques', 'James Wilson', 4.9, 30.00, 20, 95, '/images/featured/feat1.jpg', TRUE),
('Debt Management Strategies', 'Olivia Brown', 4.0, 18.00, 10, 120, '/images/featured/feat2.jpg', FALSE),
('Estate Planning Essentials', 'William Davis', 4.5, 22.00, 12, 85, '/images/featured/feat1.jpg', FALSE),
('Financial Independence & Early Retirement', 'Emma Thompson', 4.7, 28.00, 16, 175, '/images/featured/feat2.jpg', TRUE);

-- Query to select all featured courses
-- SELECT * FROM featured_courses;

-- Query to select only bestseller courses
-- SELECT * FROM featured_courses WHERE best_seller = TRUE;

-- Query to select courses with rating above 4.5
-- SELECT * FROM featured_courses WHERE rating >= 4.5;
