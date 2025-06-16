-- Create subscription_plans table
CREATE TABLE `subscription_plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `heading` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `user` VARCHAR(100) NOT NULL,
  `button` VARCHAR(100) NOT NULL,
  `profiles` VARCHAR(100) NOT NULL,
  `posts` VARCHAR(100) NOT NULL,
  `templates` VARCHAR(100) NOT NULL,
  `view` VARCHAR(100) NOT NULL,
  `support` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert data from the Manage component
INSERT INTO `subscription_plans` 
(`heading`, `price`, `user`, `button`, `profiles`, `posts`, `templates`, `view`, `support`, `category`) 
VALUES
-- Yearly plans
('Startup', 41, 'per user, per month', 'Start My 15-day Trial', '5 Social Profiles', '5 Scheduled Posts Per Profile', '400+ Templated', 'Calendar View', '24/7 Support', 'yearly'),
('Business', 29, 'per user, per month', 'Start My 15-day Trial', '10 Social Profiles', '5 Scheduled Posts Per Profile', '600+ Templated', 'Calendar View', '24/7 VIP Support', 'yearly'),
('Agency', 139, 'per user, per month', 'Start My 15-day Trial', '100 Social Profiles', '100 Scheduled Posts Per Profile', '800+ Templated', 'Calendar View', '24/7 VIP Support', 'yearly'),

-- Monthly plans
('Agency', 139, 'per user, per yearly', 'Start My 15-day Trial', '100 Social Profiles', '100 Scheduled Posts Per Profile', '800+ Templated', 'Calendar View', '24/7 VIP Support', 'monthly'),
('Startup', 41, 'per user, per yearly', 'Start My 15-day Trial', '5 Social Profiles', '5 Scheduled Posts Per Profile', '400+ Templated', 'Calendar View', '24/7 Support', 'monthly'),
('Business', 29, 'per user, per yearly', 'Start My 15-day Trial', '10 Social Profiles', '5 Scheduled Posts Per Profile', '600+ Templated', 'Calendar View', '24/7 VIP Support', 'monthly');
