-- First, ensure the table exists with the correct structure
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    imgSrc VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clear existing data
TRUNCATE TABLE testimonials;

-- Insert dummy data
INSERT INTO testimonials (name, profession, comment, imgSrc, display_order) VALUES
(
    'Robert Fox',
    'Business Owner',
    'Thanks to FinanceProTricks, I was able to establish a retirement plan that provides security for my family while optimizing my business tax strategy. Their expertise has been invaluable.',
    '/images/testimonial/user1.svg',
    1
),
(
    'Leslie Alexander',
    'Senior Executive',
    'After working with their investment advisors, my portfolio has seen consistent growth even during market volatility. Their personalized approach to wealth management truly sets them apart.',
    '/images/testimonial/user2.svg',
    2
),
(
    'Cody Fisher',
    'Medical Professional',
    'As a busy physician, I needed financial guidance that worked with my schedule. FinanceProTricks provided clear investment strategies that have helped me build wealth while focusing on my practice.',
    '/images/testimonial/user3.svg',
    3
),
(
    'Sarah Johnson',
    'Retiree',
    'Transitioning to retirement was seamless with their help. Their income planning strategies have given me peace of mind knowing my savings will last throughout my retirement years.',
    '/images/testimonial/user1.svg',
    4
),
(
    'Michael Chen',
    'Technology Entrepreneur',
    'Their tax planning saved my startup thousands in unnecessary expenses. The team understands the unique financial challenges of entrepreneurs and provides actionable solutions.',
    '/images/testimonial/user2.svg',
    5
),
(
    'Emily Rodriguez',
    'Young Professional',
    'As someone just starting my career, their financial literacy program gave me the foundation I needed to make smart decisions about saving, investing, and planning for my future.',
    '/images/testimonial/user3.svg',
    6
); 