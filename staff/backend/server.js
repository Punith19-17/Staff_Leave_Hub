const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const fs = require("fs");

const app = express();

app.set("trust proxy", 1);

// Middleware
app.use(express.json());

app.use(cors({
  origin: "https://staff-leave-hub-jlpw.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin: "https://staff-leave-hub-jlpw.vercel.app",
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Session middleware
app.use(session({
  secret: "your_secret_key",

  resave: false,

  saveUninitialized: false,

  proxy: true,
 cookie: {
    secure: true,
    sameSite: "none",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {

  console.log("SESSION:", req.session);

  console.log("USER ID:", req.session.userId);

  next();

});

// Create uploads folder automatically if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Railway MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect database
db.getConnection()
  .then((connection) => {
    console.log("Connected to Railway MySQL database.");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});


//For Emolyee id 

app.get("/api/check-employee-id/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM personal_information WHERE employee_id = ?",
      [employee_id]
    );

    if (rows.length > 0) {
      return res.json({
        exists: true
      });
    }

    return res.json({
      exists: false
    });

  } catch (error) {
    console.error("CHECK EMPLOYEE ID ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});


// Utility function for promise-based queries
async function queryAsync(sql, params = []) {
  const [results] = await db.query(sql, params);
  return results;
}
// Handle Signup Form Submission
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Basic input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  const sql = "INSERT INTO a_signup (user_name, email_id, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error storing user data", error: err.message });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Handle Admin Login
app.post("/login", async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const sql = "SELECT * FROM a_signup WHERE email_id = ?";

    const [result] = await db.query(sql, [email_id]);

    console.log("DATABASE RESULT:", result);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User does not exist"
      });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    return res.status(200).json({
      message: "Login successful",
      redirect: "/A_Dashboard"
    });

  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});


// Fetch all departments
app.get("/api/departments", (req, res) => {
  const sql = "SELECT * FROM department_info";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching departments:", err);
      return res.status(500).json({ message: "Error fetching departments", error: err.message });
    }
    res.status(200).json(result);
  });
});


// Api to insert data into personal_information for user 
app.post("/api/personal-information", upload.single("profile_picture"), async (req, res) => {
  try {
    const {
      employee_id,
      employee_type,
      name,
      email_id,
      gender,
      dob,
      mobile_no,
      permanent_address,
      adhar_number,
      department,
      designation,
      doj,
    } = req.body;

    if (
      !employee_id ||
      !employee_type ||
      !name ||
      !email_id ||
      !gender ||
      !dob ||
      !mobile_no ||
      !permanent_address ||
      !adhar_number ||
      !department ||
      !designation ||
      !doj
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const profile_picture = req.file ? req.file.path : null;

    const query = `
      INSERT INTO personal_information (
        employee_id,
        employee_type,
        name,
        email_id,
        gender,
        dob,
        mobile_no,
        permanent_address,
        adhar_number,
        department,
        designation,
        doj,
        profile_picture
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      employee_id,
      employee_type,
      name,
      email_id,
      gender,
      dob,
      mobile_no,
      permanent_address,
      adhar_number,
      department,
      designation,
      doj,
      profile_picture,
    ]);

    return res.status(201).json({
      message: "Data inserted successfully",
    });

  } catch (error) {
    console.error("PERSONAL INFO API ERROR:", error);

    return res.status(500).json({
      message: "Failed to insert data",
      error: error.message,
    });
  }
});

// API to insert data into qualification_details table with file upload

app.post(
  "/submit-qualification",
  upload.single("qualification_documents"),
  async (req, res) => {

    try {

      console.log("Received qualification submission:", {
        body: req.body,
        file: req.file
      });

      // Check if file uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Qualification document is required"
        });
      }

      // Get form fields
      const {
        employee_id,
        qualification,
        specialization,
        year_of_pass
      } = req.body;

      // Validation
      const missingFields = [];

      if (!employee_id) missingFields.push("employee_id");
      if (!qualification) missingFields.push("qualification");
      if (!specialization) missingFields.push("specialization");
      if (!year_of_pass) missingFields.push("year_of_pass");

      // Missing field check
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`
        });
      }

      // Validate year format
      if (!/^\d{4}$/.test(year_of_pass)) {
        return res.status(400).json({
          success: false,
          message: "Year of passing must be a 4-digit year"
        });
      }

      // File path
      const qualification_documents = req.file.path;

      // SQL Query
      const query = `
        INSERT INTO qualification_details
        (
          employee_id,
          qualification,
          specialization,
          year_of_pass,
          qualification_documents
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      // MYSQL2/PROMISE QUERY
      const [result] = await db.query(
        query,
        [
          employee_id,
          qualification,
          specialization,
          year_of_pass,
          qualification_documents
        ]
      );

      console.log("Qualification inserted successfully:", result);

      // SUCCESS RESPONSE
      return res.status(200).json({
        success: true,
        message: "Qualification data inserted successfully",
        insertedId: result.insertId,
        documentPath: qualification_documents
      });

    } catch (error) {

      console.error("Qualification API Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to insert qualification data",
        error: error.message
      });

    }
  }
);

// Add a new department
app.post("/api/departments", (req, res) => {
  const { dept_code, dept_name } = req.body;

  // Basic input validation
  if (!dept_code || !dept_name) {
    return res.status(400).json({ message: "Department code and name are required" });
  }

  const sql = "INSERT INTO department_info (dept_code, dept_name) VALUES (?, ?)";
  db.query(sql, [dept_code, dept_name], (err, result) => {
    if (err) {
      console.error("Error adding department:", err);
      return res.status(500).json({ message: "Error adding department", error: err.message });
    }
    const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    res.status(201).json({ id: result.insertId, dept_code, dept_name, date: formattedDate });
  });
});

// API to insert service information
// API to insert service/experience information

app.post("/api/experience", async (req, res) => {

  try {

    console.log("Received experience data:", req.body);

    const {
      employee_id,
      name_of_organization,
      s_from,
      s_to
    } = req.body;

    // Validation
    if (
      !employee_id ||
      !name_of_organization ||
      !s_from ||
      !s_to
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // SQL Query
    const query = `
      INSERT INTO experience_details
      (
        employee_id,
        name_of_organization,
        s_from,
        s_to
      )
      VALUES (?, ?, ?, ?)
    `;

    // MYSQL2/PROMISE QUERY
    const [result] = await db.query(
      query,
      [
        employee_id,
        name_of_organization,
        s_from,
        s_to
      ]
    );

    console.log("Experience inserted successfully:", result);

    // SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      message: "Experience data inserted successfully",
      insertedId: result.insertId
    });

  } catch (error) {

    console.error("Experience API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to insert experience data",
      error: error.message
    });

  }

});


// API to handle form submission staff signup
app.post('/api/employee', async (req, res) => {

  try {

    console.log("Received employee signup data:", req.body);

    const {
      employee_id,
      name,
      password
    } = req.body;

    // Validation
    if (!employee_id || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // SQL query
    const query = `
      INSERT INTO s_signup
      (
        employee_id,
        name,
        password
      )
      VALUES (?, ?, ?)
    `;

    // MYSQL2/PROMISE QUERY
    const [result] = await db.query(
      query,
      [
        employee_id,
        name,
        password
      ]
    );

    console.log("Employee signup inserted:", result);

    return res.status(200).json({
      success: true,
      message: "Employee registered successfully",
      insertedId: result.insertId
    });

  } catch (error) {

    console.error("Employee Signup API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save employee data",
      error: error.message
    });

  }

});
// API to handle validate staff login

app.post('/api/login', async (req, res) => {

  try {

    const { employee_id, password } = req.body;

    console.log("Login request:", employee_id);

    // Validation
    if (!employee_id || !password) {

      return res.status(400).json({
        success: false,
        message: "Employee ID and password required"
      });

    }

    // SQL query
    const query = `
      SELECT * FROM s_signup
      WHERE employee_id = ? AND password = ?
    `;

    const [results] = await db.query(
      query,
      [employee_id, password]
    );

    console.log("Login results:", results);

    // Invalid login
    if (results.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });

    }

    // REGENERATE SESSION
    req.session.regenerate((err) => {

      if (err) {

        console.error("Session regenerate error:", err);

        return res.status(500).json({
          success: false,
          message: "Session error"
        });

      }

      // SAVE USER ID
      req.session.userId = employee_id;

      console.log("SESSION USER:", req.session.userId);

      // SAVE SESSION
      req.session.save((err) => {

        if (err) {

          console.error("Session save error:", err);

          return res.status(500).json({
            success: false,
            message: "Session save failed"
          });

        }

        console.log("Session saved successfully");

        return res.status(200).json({
          success: true,
          message: "Login successful",
          employee_id
        });

      });

    });

  } catch (error) {

    console.error("LOGIN API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});


// API to record Loggedin users
app.post('/api/record-login', async (req, res) => {
  try {
    const { employee_id, login_date, login_time } = req.body;
    
    // Add validation
    if (!employee_id || !login_date || !login_time) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Insert login record
    const result = await queryAsync(
      `INSERT INTO logged_employee (employee_id, login_date, login_time) 
       VALUES (?, ?, ?)`,
      [employee_id, login_date, login_time]
    );
    
    // Get the inserted record (simplified without ORDER BY)
    const [insertedRecord] = await queryAsync(
      `SELECT * FROM logged_employee 
       WHERE employee_id = ? AND login_date = ? AND login_time = ? 
       LIMIT 1`,
      [employee_id, login_date, login_time]
    );
    
    res.json({ 
      success: true, 
      record: insertedRecord 
    });
  } catch (error) {
    console.error("Error recording login:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to record login",
      details: error.code || null,
      sqlError: error.sqlMessage || null  // Added more detailed SQL error info
    });
  }
});

// Authentication middleware

// Authentication middleware

const requireAuth = (req, res, next) => {

  if (!req.session.userId) {

    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });

  }

  next();

};

// Get user profile data
app.get('/api/profile', requireAuth, async (req, res) => {

  try {

    const employeeId = req.session.userId;

    console.log("PROFILE SESSION USER:", employeeId);

    if (!employeeId) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }

    const [results] = await db.query(
      `
      SELECT * FROM personal_information
      WHERE employee_id = ?
      `,
      [employeeId]
    );

    console.log("PROFILE RESULTS:", results);

    if (results.length === 0) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    return res.json(results[0]);

  } catch (error) {

    console.error("PROFILE API ERROR:", error);

    return res.status(500).json({
      error: 'Server error',
      details: error.message
    });

  }

});

app.post("/api/leave-request", upload.single("leave_letter"), async (req, res) => {

  try {

    const {
      employee_id,
      name,
      department,
      designation,
      leave_type,
      start_date,
      end_date,
      reason
    } = req.body;

    const leave_letter = req.file ? req.file.path : null;

    // Validation
    if (
      !employee_id ||
      !name ||
      !department ||
      !designation ||
      !leave_type ||
      !start_date ||
      !end_date ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    // Get DOJ
    const [employeeRows] = await db.query(
      `SELECT doj FROM personal_information WHERE employee_id = ? LIMIT 1`,
      [employee_id]
    );

    if (employeeRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    const dateOfJoining = new Date(employeeRows[0].doj);
    const today = new Date();

    const monthsDiff =
      (today.getFullYear() - dateOfJoining.getFullYear()) * 12 +
      (today.getMonth() - dateOfJoining.getMonth());

    const totalLeaves = monthsDiff >= 6 ? 20 : 10;

    // Count approved leaves
    const [leaveRows] = await db.query(
      `SELECT COUNT(*) as approvedLeaves
       FROM leave_request
       WHERE employee_id = ? AND status = 'Approved'`,
      [employee_id]
    );

    const approvedLeaves = leaveRows[0].approvedLeaves || 0;

    if (approvedLeaves >= totalLeaves) {
      return res.status(400).json({
        success: false,
        message: "No remaining leaves available"
      });
    }

    // Insert leave request
    const [insertResult] = await db.query(
      `
      INSERT INTO leave_request
      (
        employee_id,
        name,
        department,
        designation,
        leave_type,
        start_date,
        end_date,
        leave_letter,
        reason,
        status,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())
      `,
      [
        employee_id,
        name,
        department,
        designation,
        leave_type,
        start_date,
        end_date,
        leave_letter,
        reason
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      id: insertResult.insertId
    });

  } catch (error) {

    console.error("LEAVE REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

});

// Add this new API endpoint to your backend
app.get("/api/user-leave-data", async (req, res) => {

  try {

    console.log("SESSION USER:", req.session.userId);

    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    // DOJ query
    const [dojResult] = await db.query(
      "SELECT doj, name FROM personal_information WHERE employee_id = ?",
      [userId]
    );

    console.log("DOJ RESULT:", dojResult);

    if (dojResult.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const dateOfJoining = new Date(dojResult[0].doj);
    const username = dojResult[0].name || "User";

    const today = new Date();

    const monthsDiff =
      (today.getFullYear() - dateOfJoining.getFullYear()) * 12 +
      (today.getMonth() - dateOfJoining.getMonth());

    const totalLeaves = monthsDiff >= 6 ? 20 : 10;

    // Leave count query
    const [leaveResult] = await db.query(
      `
      SELECT
        COUNT(*) as leavesApplied,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as leavesApproved
      FROM leave_request
      WHERE employee_id = ?
      `,
      [userId]
    );

    console.log("LEAVE RESULT:", leaveResult);

    const leavesApplied = leaveResult[0].leavesApplied || 0;
    const leavesApproved = leaveResult[0].leavesApproved || 0;

    const leavesRemaining = totalLeaves - leavesApproved;

    return res.json({
      username,
      totalLeaves,
      leavesApplied,
      leavesApproved,
      leavesRemaining
    });

  } catch (error) {

    console.error("USER LEAVE DATA ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});



/**
* @route GET /api/attendance/departments
* @description Get all distinct departments with employee counts
* @returns {Array} List of departments with counts
*/
app.get('/api/attendance/departments', async (req, res) => {
  try {
    const sql = `
      SELECT 
        department, 
        COUNT(*) as employee_count
      FROM personal_information
      WHERE department IS NOT NULL
      GROUP BY department
      ORDER BY department
    `;
    
    const results = await queryAsync(sql);
    
    res.status(200).json({
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: err.message,
      code: "ATT_DEPS_001"
    });
  }
});

/**
 * @route GET /api/attendance/employees/:department
 */
app.get('/api/attendance/employees/:department', async (req, res) => {
  const { department } = req.params;
  
  console.log(`Fetching employees for department: ${department}`);

  try {
    // First verify the department exists
    const deptCheck = await queryAsync(
      `SELECT 1 FROM personal_information WHERE department = ? LIMIT 1`,
      [department]
    );

    if (deptCheck.length === 0) {
      console.log(`Department ${department} not found`);
      return res.status(404).json({ 
        success: false,
        message: `Department ${department} not found`
      });
    }

    // Then get employees
    const employees = await queryAsync(
      `SELECT employee_id, name 
       FROM personal_information 
       WHERE department = ? 
       ORDER BY name`,
      [department]
    );

    console.log(`Found ${employees.length} employees for ${department}`);

    res.json({
      success: true,
      data: employees,
      count: employees.length
    });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({
      success: false,
      message: "Database query failed",
      error: err.message,
      query: `SELECT employee_id, name FROM personal_information WHERE department = '${department}'`
    });
  }
});
/**
* @route GET /api/attendance/daily/:date
* @description Get attendance for a specific date
* @param {string} date - Date in YYYY-MM-DD format
* @returns {Array} Attendance records for the date
*/
app.get('/api/attendance/daily/:date', async (req, res) => {
try {
  const { date } = req.params;
  
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      success: false,
      message: "Valid date in YYYY-MM-DD format is required",
      code: "ATT_DAY_001"
    });
  }

  const sql = `
    SELECT 
      a.employee_id,
      p.name,
      p.designation,
      a.department,
      a.status,
      a.remarks,
      DATE_FORMAT(a.recorded_at, '%Y-%m-%d %H:%i:%s') as recorded_at,
      a.recorded_by
    FROM attendance a
    JOIN personal_information p ON a.employee_id = p.employee_id
    WHERE a.date = ?
    ORDER BY a.department, p.name
  `;

  const [results] = await db.query(sql, [date]);
  
  res.status(200).json({
    success: true,
    data: results,
    date,
    count: results.length,
    timestamp: new Date().toISOString()
  });
  
} catch (err) {
  console.error("Error fetching daily attendance:", err);
  res.status(500).json({
    success: false,
    message: "Failed to fetch attendance data",
    error: err.message,
    code: "ATT_DAY_002"
  });
}
});

/**
* @route POST /api/attendance
* @description Submit attendance records
* @param {Object} body - { date, department, records[], recorded_by }
* @returns {Object} Operation result
*/
app.post('/api/attendance', async (req, res) => {
const { date, department, records, recorded_by } = req.body;

// Validate input
if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  return res.status(400).json({
    success: false,
    message: "Valid date in YYYY-MM-DD format is required",
    code: "ATT_SUB_001"
  });
}

if (!department || typeof department !== 'string') {
  return res.status(400).json({
    success: false,
    message: "Department name is required",
    code: "ATT_SUB_002"
  });
}

if (!Array.isArray(records) || records.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Attendance records array is required",
    code: "ATT_SUB_003"
  });
}

// Validate each record
for (const record of records) {
  if (!record.employee_id || !record.name || !['P', 'A', 'L', 'H'].includes(record.status)) {
    return res.status(400).json({
      success: false,
      message: "Each record must have valid employee_id, name, and status (P/A/L/H)",
      code: "ATT_SUB_004"
    });
  }
}

const connection = await db.getConnection();
try {
  await connection.beginTransaction();

  // 1. Delete existing attendance for this date/department
  await connection.query(
    `DELETE FROM attendance WHERE date = ? AND department = ?`,
    [date, department]
  );

  // 2. Insert new records
  const values = records.map(record => [
    record.employee_id,
    record.name,
    department,
    date,
    record.status,
    recorded_by || 'system',
    record.remarks || null
  ]);

  const [result] = await connection.query(
    `INSERT INTO attendance 
     (employee_id, name, department, date, status, recorded_by, remarks) 
     VALUES ?`,
    [values]
  );

  await connection.commit();

  res.status(201).json({
    success: true,
    message: "Attendance submitted successfully",
    records_processed: result.affectedRows,
    date,
    department
  });
  
} catch (err) {
  await connection.rollback();
  console.error("Attendance submission error:", err);
  res.status(500).json({
    success: false,
    message: "Failed to submit attendance",
    error: err.message,
    code: "ATT_SUB_005"
  });
} finally {
  connection.release();
}
});

/**
* @route GET /api/attendance/report
* @description Generate custom attendance report
* @param {string} startDate - Start date (YYYY-MM-DD)
* @param {string} endDate - End date (YYYY-MM-DD)
* @param {string} [department] - Optional department filter
* @param {string} [employee_id] - Optional employee filter
* @returns {Array} Attendance report data
*/
app.get('/api/attendance/report', async (req, res) => {
try {
  const { startDate, endDate, department, employee_id, status } = req.query;

  // Validate dates
  if (!startDate || !endDate || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    return res.status(400).json({
      success: false,
      message: "Valid startDate and endDate in YYYY-MM-DD format are required",
      code: "ATT_REP_001"
    });
  }

  let sql = `
    SELECT 
      a.employee_id,
      p.name,
      p.designation,
      a.department,
      a.date,
      a.status,
      a.remarks,
      DATE_FORMAT(a.recorded_at, '%Y-%m-%d %H:%i:%s') as recorded_at,
      a.recorded_by
    FROM attendance a
    JOIN personal_information p ON a.employee_id = p.employee_id
    WHERE a.date BETWEEN ? AND ?
  `;

  const params = [startDate, endDate];

  // Add filters
  if (department) {
    sql += " AND a.department = ?";
    params.push(department);
  }
  if (employee_id) {
    sql += " AND a.employee_id = ?";
    params.push(employee_id);
  }
  if (status && ['P', 'A', 'L', 'H'].includes(status)) {
    sql += " AND a.status = ?";
    params.push(status);
  }

  sql += " ORDER BY a.date, a.department, p.name";

const [results] = await db.query(sql, params);  
  res.status(200).json({
    success: true,
    data: results,
    startDate,
    endDate,
    recordCount: results.length,
    generatedAt: new Date().toISOString()
  });
  
} catch (err) {
  console.error("Report generation error:", err);
  res.status(500).json({
    success: false,
    message: "Failed to generate attendance report",
    error: err.message,
    code: "ATT_REP_002"
  });
}
});

/**
* @route GET /api/attendance/employee/:employeeId
* @description Get attendance history for an employee
* @param {string} employeeId - Employee ID
* @param {string} [startDate] - Optional start date filter
* @param {string} [endDate] - Optional end date filter
* @returns {Array} Employee's attendance records
*/
app.get('/api/attendance/employee/:employeeId', async (req, res) => {
try {
  const { employeeId } = req.params;
  const { startDate, endDate } = req.query;

  if (!employeeId) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
      code: "ATT_EMP_004"
    });
  }

  let sql = `
    SELECT 
      a.date,
      a.status,
      a.department,
      a.remarks,
      DATE_FORMAT(a.recorded_at, '%Y-%m-%d %H:%i:%s') as recorded_at
    FROM attendance a
    WHERE a.employee_id = ?
  `;

  const params = [employeeId];

  // Add date range if provided
  if (startDate && endDate) {
    sql += " AND a.date BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  sql += " ORDER BY a.date DESC LIMIT 90"; // Last 90 days by default

const [results] = await db.query(sql, params);  
  res.status(200).json({
    success: true,
    data: results,
    employeeId,
    recordCount: results.length
  });
  
} catch (err) {
  console.error("Employee attendance error:", err);
  res.status(500).json({
    success: false,
    message: "Failed to fetch employee attendance",
    error: err.message,
    code: "ATT_EMP_005"
  });
}
});

/**
* @route GET /api/attendance/stats
* @description Get attendance statistics
* @param {string} date - Date for stats (YYYY-MM-DD)
* @param {string} [department] - Optional department filter
* @returns {Object} Attendance statistics
*/
app.get('/api/attendance/stats', async (req, res) => {
try {
  const { date, department } = req.query;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      success: false,
      message: "Valid date in YYYY-MM-DD format is required",
      code: "ATT_STAT_001"
    });
  }

  let sql = `
    SELECT 
      status,
      COUNT(*) as count
    FROM attendance
    WHERE date = ?
  `;

  const params = [date];

  if (department) {
    sql += " AND department = ?";
    params.push(department);
  }

  sql += " GROUP BY status";

const [results] = await db.query(sql, params);  
  // Convert to more usable format
  const stats = {
    present: 0,
    absent: 0,
    leave: 0,
    holiday: 0,
    total: 0
  };

  results.forEach(row => {
    const key = 
      row.status === 'P' ? 'present' :
      row.status === 'A' ? 'absent' :
      row.status === 'L' ? 'leave' : 'holiday';
    stats[key] = row.count;
    stats.total += row.count;
  });

  res.status(200).json({
    success: true,
    data: stats,
    date,
    department: department || 'all'
  });
  
} catch (err) {
  console.error("Stats error:", err);
  res.status(500).json({
    success: false,
    message: "Failed to calculate attendance stats",
    error: err.message,
    code: "ATT_STAT_002"
  });
}
});

// Leave Application Endpoints (add to your existing server.js)

// Get all leave requests
app.get('/api/leave-requests', async (req, res) => {

  try {

    console.log("FETCHING ALL LEAVE REQUESTS");

    const sql = `
      SELECT 
        id,
        employee_id,
        name,
        department,
        designation,
        leave_type,
        DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
        DATE_FORMAT(end_date, '%Y-%m-%d') as end_date,
        reason,
        leave_letter,
        status
      FROM leave_request
      ORDER BY start_date DESC
    `;

    const [results] = await db.query(sql);

    console.log("LEAVE REQUEST RESULTS:", results);

    return res.status(200).json({
      success: true,
      data: results
    });

  } catch (error) {

    console.error("LEAVE REQUEST FETCH ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

});

// Get single leave request by ID
app.get('/api/leave-requests/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  const { id } = req.params;
  const sql = `
    SELECT 
      id,
      employee_id, 
      name, 
      department, 
      designation, 
      leave_type, 
      DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
      DATE_FORMAT(end_date, '%Y-%m-%d') as end_date, 
      reason, 
      leave_letter,
      status
    FROM leave_request 
    WHERE id = ?
  `;
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching leave request:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Database error',
        message: err.message
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Not found',
        message: 'Leave request not found'
      });
    }
    
    res.json({
      success: true,
      data: results[0]
    });
  });
});

// Update leave request status
app.put('/api/leave-requests/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    console.log("UPDATE REQUEST:", id, status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const [updateResult] = await db.query(
      `
      UPDATE leave_request
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found"
      });
    }

    const [updatedRows] = await db.query(
      `
      SELECT *
      FROM leave_request
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      data: updatedRows[0]
    });

  } catch (error) {

    console.error("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

});

// Submit new leave request (with file upload)
app.post('/api/leave-requests', upload.single('leave_letter'), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  const {
    employee_id,
    name,
    department,
    designation,
    leave_type,
    start_date,
    end_date,
    reason
  } = req.body;

  const leave_letter = req.file ? req.file.path : null;

  // Basic validation
  const requiredFields = {
    employee_id: 'Employee ID',
    name: 'Name',
    department: 'Department',
    leave_type: 'Leave Type',
    start_date: 'Start Date',
    end_date: 'End Date',
    reason: 'Reason'
  };

  const missingFields = Object.keys(requiredFields).filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      message: `Missing required fields: ${missingFields.map(f => requiredFields[f]).join(', ')}`
    });
  }

  const sql = `
    INSERT INTO leave_request (
      employee_id, name, department, designation, leave_type,
      start_date, end_date, leave_letter, reason, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(
    sql,
    [
      employee_id,
      name,
      department,
      designation || null,
      leave_type,
      start_date,
      end_date,
      leave_letter,
      reason
    ],
    (err, result) => {
      if (err) {
        console.error("Error submitting leave request:", err);
        return res.status(500).json({ 
          success: false,
          error: 'Database error',
          message: err.message
        });
      }
      
      res.status(201).json({ 
        success: true,
        message: "Leave request submitted successfully", 
        id: result.insertId,
        data: {
          id: result.insertId,
          status: 'Pending'
        }
      });
    }
  );
});

// API endpoint to get leaves by employee_id

app.get('/api/employee/leaves', async (req, res) => {

  try {

    console.log("EMPLOYEE LEAVES API CALLED");

    // Check session
    if (!req.session.userId) {

      console.log("NO SESSION USER");

      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login first'
      });

    }

    const employeeId = req.session.userId;

    console.log("EMPLOYEE ID:", employeeId);

    const query = `
      SELECT 
        id,
        employee_id,
        name,
        department,
        designation,
        leave_type,
        DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
        DATE_FORMAT(end_date, '%Y-%m-%d') as end_date,
        reason,
        leave_letter,
        status
      FROM leave_request
      WHERE employee_id = ?
      ORDER BY start_date DESC
    `;

    const [results] = await db.query(
      query,
      [employeeId]
    );

    console.log("DATABASE RESULTS:", results);

    const leavesWithDuration = results.map((leave) => {

      const start = new Date(leave.start_date);

      const end = new Date(leave.end_date);

      const duration =
        Math.ceil(
          (end - start) /
          (1000 * 60 * 60 * 24)
        ) + 1;

      return {
        ...leave,
        duration: `${duration} day${duration > 1 ? 's' : ''}`
      };

    });

    console.log("FINAL RESPONSE SENT");

    return res.status(200).json({
      success: true,
      data: leavesWithDuration,
      count: leavesWithDuration.length
    });

  } catch (error) {

    console.error("EMPLOYEE LEAVES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

});

// API for ADashboard 
app.get("/api/Adashboard", async (req, res) => {

  try {

    // Total employees
    const [employeeResults] = await db.query(
      "SELECT COUNT(*) as count FROM personal_information"
    );

    const totalEmployees =
      employeeResults[0]?.count || 0;

    // Leave counts
    const [leaveResults] = await db.query(
      `
      SELECT 
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM leave_request
      `
    );

    const leaveData = leaveResults[0] || {};

    return res.status(200).json({
      totalEmployees,
      requestedLeaves: leaveData.pending || 0,
      approvedLeaves: leaveData.approved || 0,
      rejectedLeaves: leaveData.rejected || 0
    });

  } catch (error) {

    console.error("ADASHBOARD ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


// API endpoint to get all logged employees
app.get('/api/logged-employees', async (req, res) => {
  try {
    console.log('Fetching logged employees...'); // Debug log
    
    const results = await queryAsync(
      `SELECT id, employee_id, 
       DATE(login_date) as login_date, 
       TIME(login_time) as login_time 
       FROM logged_employee 
       ORDER BY login_date DESC, login_time DESC`
    );
    
    console.log('Found records:', results.length); // Debug log
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
    
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({
      success: false,
      message: "Database operation failed",
      error: error.message,
      sqlError: error.sqlMessage || null
    });
  }
});



// Update your /api/holidays endpoint
app.post('/api/holidays', upload.single('image'), async (req, res) => {
  console.log('Request received:', {
    body: req.body,
    file: req.file ? req.file : 'No file uploaded'
  });

  try {
    const { month, year } = req.body;
    const image = req.file ? req.file.filename : null;

    // Enhanced validation
    if (!month || !year) {
      console.log('Validation failed: Missing month or year');
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
        code: "HOL_001"
      });
    }

    // Validate month format
    const validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    if (!validMonths.includes(month)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month. Please use full month name (e.g. 'January')",
        code: "HOL_004"
      });
    }

    // Validate year format
    if (!/^\d{4}$/.test(year)) {
      return res.status(400).json({
        success: false,
        message: "Year must be 4 digits (e.g. 2023)",
        code: "HOL_005"
      });
    }

    // Check for existing entry (modified to work without id column)
    let existing;
    try {
      existing = await queryAsync(
        'SELECT month, year FROM holidays WHERE month = ? AND year = ?', 
        [month, year]
      );
    } catch (queryErr) {
      console.error('Database error:', queryErr);
      return res.status(500).json({
        success: false,
        message: "Database operation failed",
        code: "HOL_007",
        error: queryErr.message
      });
    }

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Holiday calendar already exists for this month/year",
        code: "HOL_002"
      });
    }

    // Insert new record
    try {
      await queryAsync(
        'INSERT INTO holidays (month, year, image) VALUES (?, ?, ?)',
        [month, year, image]
      );
    } catch (insertErr) {
      console.error('Insert error:', insertErr);
      // Clean up uploaded file if insert failed
      if (req.file) {
        try {
          const filePath = path.join(uploadsDir, req.file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (cleanupErr) {
          console.error('File cleanup error:', cleanupErr);
        }
      }
      
      return res.status(500).json({
        success: false,
        message: "Database insert failed",
        code: "HOL_008",
        error: insertErr.message
      });
    }

    // Success response (modified since we don't have an id)
    return res.status(201).json({
      success: true,
      message: "Holiday calendar saved successfully",
      month,
      year,
      imageUrl: image ? `/uploads/${image}` : null
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected server error",
      code: "HOL_009",
      error: err.message
    });
  }
});


// GET endpoint to search holidays

app.get('/api/holidays', async (req, res) => {
  const { month, year } = req.query;
  console.log('Search request received for:', month, year); // Debug log

  try {
    // Validate inputs
    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required",
        code: "HOL_SEARCH_001"
      });
    }

    // Search for holiday calendar
    const results = await queryAsync(
      'SELECT month, year, image FROM holidays WHERE month = ? AND year = ?',
      [month, year]
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No holiday calendar found for the specified month and year",
        code: "HOL_SEARCH_002"
      });
    }

    const holiday = results[0];
    return res.json({
      success: true,
      data: {
        month: holiday.month,
        year: holiday.year,
        imageUrl: holiday.image ? `/uploads/${holiday.image}` : null
      }
    });

  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({
      success: false,
      message: "Error searching holiday calendar",
      code: "HOL_SEARCH_003",
      error: err.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});