<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Включим вывод ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Данные для подключения к БД
$host = '127.0.0.1';
$dbname = 'student_dormitory';
$username = 'Andreu';
$password = 'Andrei123!';
$port = 3306;

try {
    // Подключение к БД
    $dsn = "mysql:host=$host;dbname=$dbname;port=$port;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Исправленный SQL запрос - получаем всех студентов и их связанные данные
    $sql = "
        SELECT 
            s.student_id as id,
            s.full_name,
            s.date_of_birth,
            s.phone_number,
            s.average_grade,
            s.has_public_work,
            s.family_income_per_member as family_income,
            r.room_id,
            r.building_number,
            r.floor,
            r.capacity as room_capacity,
            d.dormitory_id,
            d.address,
            d.dormitory_type,
            d.total_capacity as dormitory_capacity,
            res.residence_id,
            res.check_in_date,
            res.check_out_date,
            app.application_id,
            app.application_date,
            app.desired_dormitory_type as desired_type
        FROM students s
        LEFT JOIN residence res ON s.student_id = res.student_id
        LEFT JOIN rooms r ON res.room_id = r.room_id
        LEFT JOIN dormitories d ON r.dormitory_id = d.dormitory_id
        LEFT JOIN applications app ON s.student_id = app.student_id
        ORDER BY s.student_id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $students = $stmt->fetchAll();
    
    if (empty($students)) {
        echo json_encode([
            'success' => true,
            'data' => [],
            'count' => 0,
            'message' => 'В базе данных нет студентов'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Форматируем данные для ответа
    $formattedStudents = [];
    foreach ($students as $student) {
        $formattedStudents[] = [
            'id' => (int)$student['id'],
            'full_name' => $student['full_name'],
            'date_of_birth' => $student['date_of_birth'],
            'phone_number' => $student['phone_number'] ?: 'Не указан',
            'average_grade' => $student['average_grade'] ? (float)$student['average_grade'] : null,
            'has_public_work' => (bool)$student['has_public_work'],
            'family_income' => $student['family_income'] ? (float)$student['family_income'] : null,
            'room_info' => $student['room_id'] ? [
                'room_id' => (int)$student['room_id'],
                'building_number' => (int)$student['building_number'],
                'floor' => (int)$student['floor'],
                'capacity' => (int)$student['room_capacity']
            ] : null,
            'dormitory_info' => $student['dormitory_id'] ? [
                'dormitory_id' => (int)$student['dormitory_id'],
                'address' => $student['address'],
                'type' => $student['dormitory_type'],
                'total_capacity' => (int)$student['dormitory_capacity']
            ] : null,
            'residence_info' => $student['residence_id'] ? [
                'residence_id' => (int)$student['residence_id'],
                'check_in_date' => $student['check_in_date'],
                'check_out_date' => $student['check_out_date']
            ] : null,
            'application_info' => $student['application_id'] ? [
                'application_id' => (int)$student['application_id'],
                'application_date' => $student['application_date'],
                'desired_type' => $student['desired_type']
            ] : null
        ];
    }

    // Успешный ответ
    echo json_encode([
        'success' => true,
        'data' => $formattedStudents,
        'count' => count($formattedStudents),
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => 'Данные успешно загружены из базы данных'
    ], JSON_UNESCAPED_UNICODE);

} catch(PDOException $exception) {
    error_log("Ошибка БД: " . $exception->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка базы данных: ' . $exception->getMessage(),
        'code' => $exception->getCode(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
    
} catch(Exception $exception) {
    error_log("Общая ошибка: " . $exception->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка: ' . $exception->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
}
?>