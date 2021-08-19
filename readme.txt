הערות על הפרוייקט:

1. ראיתי כמה וכמה דרכים לעשות authentication עם socket, לעניות דעתי הייתי ממש את login וregister עם rest api
שותל בהצלחה cookie עם httpOnly עם jwt ואז עם הסוקט הייתי מאבטח את כולו באמצעות middleware
אולי פיספתי משהו, אשמח להבין מה :)
2. עוד כמה דברים שהייתי ממש אחרת באמצעות Docker צריך להרים כמה instances של containers כדי שידע לנהל את הפניות עם הredis אז צריך proxy
דוגמא נמצאת פה:
https://socket.io/docs/v4/using-multiple-nodes/#NginX-configuration
3. דבר אחד שלא ממשתי אבל לא הייתה בקשה, הייתי משתמש בredis כדי לשמור את active users
4. הוספתי עוד socket שבעצם מחזיר את פרטי היוזר במקרה הצורך.