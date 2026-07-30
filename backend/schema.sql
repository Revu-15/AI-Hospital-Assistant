-- Create Database
CREATE DATABASE IF NOT EXISTS hospital_ai_db;
USE hospital_ai_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    floor_location VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 5.0,
    available_slots JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    status ENUM('Scheduled', 'Checked-In', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    symptoms_summary TEXT,
    triage_urgency VARCHAR(20),
    token_number VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- 5. Medical Reports Table
CREATE TABLE IF NOT EXISTS medical_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    vector_index_id VARCHAR(100),
    summary TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- 6. Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL UNIQUE,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis TEXT NOT NULL,
    clinical_notes TEXT,
    recommended_lab_tests JSON,
    consultation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- 7. Pharmacy Inventory Table
CREATE TABLE IF NOT EXISTS pharmacy_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(100) NOT NULL UNIQUE,
    dosage_form VARCHAR(50) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL,
    requires_prescription BOOLEAN DEFAULT TRUE
);

-- 8. Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consultation_id INT NOT NULL,
    medicine_id INT NOT NULL,
    dosage_instructions VARCHAR(255) NOT NULL,
    duration_days INT NOT NULL,
    quantity INT NOT NULL,
    ai_safety_analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES pharmacy_inventory(id) ON DELETE CASCADE
);

-- 9. Bills Table
CREATE TABLE IF NOT EXISTS bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    consultation_id INT NOT NULL UNIQUE,
    consultation_fee DECIMAL(10,2) NOT NULL,
    pharmacy_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    lab_test_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    insurance_covered DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    patient_payable DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Pending', 'Paid', 'Partially Paid') DEFAULT 'Pending',
    invoice_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE
);

-- 10. Followups Table
CREATE TABLE IF NOT EXISTS followups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    scheduled_date DATE NOT NULL,
    reminder_type ENUM('SMS', 'Email', 'App_Push') NOT NULL,
    status ENUM('Pending', 'Sent', 'Completed') DEFAULT 'Pending',
    message_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Insert Initial Seed Data
INSERT INTO departments (name, code, description, floor_location) VALUES
('Emergency Medicine', 'EMERGENCY', '24/7 Acute care and emergency trauma center', 'Ground Floor'),
('Cardiology', 'CARDIO', 'Heart, vascular, and thoracic care', 'Floor 3, Building A'),
('Neurology', 'NEURO', 'Brain, spine, and nervous system specialists', 'Floor 4, Building B'),
('General Medicine', 'GENMED', 'Primary care and internal medicine', 'Floor 2, Main Block')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO doctors (full_name, department_id, specialization, experience_years, rating, available_slots) VALUES
('Dr. Sarah Jenkins', 2, 'Interventional Cardiology', 15, 4.95, '["09:00 AM", "10:30 AM", "02:00 PM"]'),
('Dr. Marcus Vance', 2, 'Electrophysiology Specialist', 12, 4.88, '["11:00 AM", "01:30 PM", "04:00 PM"]'),
('Dr. Elena Rostova', 3, 'Senior Neurologist', 18, 4.92, '["10:00 AM", "01:00 PM", "03:30 PM"]'),
('Dr. Robert Chen', 1, 'Emergency Care Lead', 14, 4.90, '["Immediate", "24/7 On-call"]')
ON DUPLICATE KEY UPDATE full_name=full_name;

INSERT INTO pharmacy_inventory (medicine_name, dosage_form, stock_quantity, unit_price, requires_prescription) VALUES
('Aspirin 81mg', 'Tablet', 500, 15.00, TRUE),
('Clopidogrel 75mg', 'Tablet', 300, 30.00, TRUE),
('Atorvastatin 20mg', 'Tablet', 400, 25.00, TRUE),
('Amoxicillin 500mg', 'Capsule', 250, 12.50, TRUE)
ON DUPLICATE KEY UPDATE medicine_name=medicine_name;
