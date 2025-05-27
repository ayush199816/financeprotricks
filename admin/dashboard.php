<?php
session_start();
require_once '../config/database.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../login.php');
    exit();
}

$database = new Database();
$db = $database->getConnection();

// Get total users count
$query = "SELECT COUNT(*) as total_users FROM users WHERE role != 'admin'";
$stmt = $db->prepare($query);
$stmt->execute();
$total_users = $stmt->fetch(PDO::FETCH_ASSOC)['total_users'];

// Get premium users count
$query = "SELECT COUNT(*) as premium_users FROM users WHERE role = 'premium'";
$stmt = $db->prepare($query);
$stmt->execute();
$premium_users = $stmt->fetch(PDO::FETCH_ASSOC)['premium_users'];

// Get recent activities
$query = "SELECT u.username, l.activity_type, l.description, l.created_at 
          FROM user_activity_logs l 
          JOIN users u ON l.user_id = u.user_id 
          ORDER BY l.created_at DESC LIMIT 10";
$stmt = $db->prepare($query);
$stmt->execute();
$recent_activities = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Finance Pro Tricks</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <h1 class="text-xl font-bold">Finance Pro Tricks</h1>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <a href="../logout.php" class="text-gray-700 hover:text-gray-900">Logout</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            Total Users
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-gray-900">
                            <?php echo $total_users; ?>
                        </dd>
                    </div>
                </div>
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            Premium Users
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-gray-900">
                            <?php echo $premium_users; ?>
                        </dd>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Recent Activities
                    </h3>
                    <div class="mt-4">
                        <div class="flow-root">
                            <ul class="-my-5 divide-y divide-gray-200">
                                <?php foreach ($recent_activities as $activity): ?>
                                <li class="py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                <?php echo htmlspecialchars($activity['username']); ?>
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                <?php echo htmlspecialchars($activity['activity_type']); ?> - 
                                                <?php echo htmlspecialchars($activity['description']); ?>
                                            </p>
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            <?php echo date('M d, Y H:i', strtotime($activity['created_at'])); ?>
                                        </div>
                                    </div>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html> 