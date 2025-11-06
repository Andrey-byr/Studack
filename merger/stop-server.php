<?php
// stop-server.php
header('Content-Type: application/json; charset=utf-8');

// Логируем запрос на остановку
file_put_contents('server.log', "[" . date('Y-m-d H:i:s') . "] Received stop request\n", FILE_APPEND);

// Отправляем сигнал остановки
$pid = file_get_contents('server.pid');
if ($pid && is_numeric($pid)) {
    posix_kill($pid, SIGTERM);
    echo json_encode(['success' => true, 'message' => 'Server stop signal sent']);
} else {
    echo json_encode(['success' => false, 'message' => 'PID file not found']);
}

// Завершаем выполнение
exit;
?>