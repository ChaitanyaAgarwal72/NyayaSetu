create database nyayasetu;
use nyayasetu;

CREATE TABLE lawyers (
    lawyer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    email VARCHAR(255) UNIQUE NOT NULL,
    advocate_no VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile_no VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    lawyer_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_no VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    language VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_client_lawyer FOREIGN KEY (lawyer_id) REFERENCES lawyers(lawyer_id)
);

CREATE TABLE cases (
    case_id INT AUTO_INCREMENT PRIMARY KEY,
    lawyer_id INT NOT NULL,
    client_id INT NOT NULL,
    case_number VARCHAR(100) UNIQUE NOT NULL,
    case_title VARCHAR(255) NOT NULL,
    court_name VARCHAR(255) NOT NULL,
    case_type VARCHAR(100) NOT NULL,
    filing_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (
        status IN (
            'Pending',                -- Case filed but not yet heard
            'Ongoing',                -- Case under trial/hearings
            'Reserved for Judgment',  -- Waiting for decision
            'Disposed',               -- Case decided/judgment given
            'Appeal Filed',           -- Appeal submitted
            'Closed'                  -- Fully closed
        )
    ),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cases_lawyer FOREIGN KEY (lawyer_id) REFERENCES lawyers(lawyer_id),
    CONSTRAINT fk_cases_client FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE case_hearings (
    hearing_id INT AUTO_INCREMENT PRIMARY KEY,
	case_number VARCHAR(100) NOT NULL,
    hearing_name VARCHAR(255) NOT NULL,   -- Label/Name of hearing
    hearing_pdf LONGBLOB NOT NULL,        -- Stores PDF directly
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_hearing_case FOREIGN KEY (case_number) REFERENCES cases(case_number)
);
CREATE TABLE otp_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    INDEX idx_email_otp (email, otp),
    INDEX idx_expires (expires_at),
    constraint foreign key (email) references lawyers(email)
);
