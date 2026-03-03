
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    duration_minutes INTEGER,
    meeting_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO meetings (user_id, duration_minutes, meeting_type) VALUES 
(1, 45, 'Internal'), (1, 60, 'Client'), (2, 30, 'Internal'),
(1, 15, 'Internal'), (2, 90, 'Client'), (3, 20, 'Support');


SELECT 
    user_id, 
    COUNT(*) AS total_meetings,
    SUM(duration_minutes) AS total_minutes_spent,
    ROUND(AVG(duration_minutes), 2) AS avg_meeting_length
FROM meetings
GROUP BY user_id
HAVING COUNT(*) > 1  
ORDER BY total_minutes_spent DESC;

SELECT 
    meeting_type,
    COUNT(id) AS volume,
    CASE 
        WHEN duration_minutes < 30 THEN 'Quick Sync'
        WHEN duration_minutes BETWEEN 30 AND 60 THEN 'Standard'
        ELSE 'Deep Dive'
    END AS meeting_category
FROM meetings
GROUP BY meeting_type, duration_minutes;