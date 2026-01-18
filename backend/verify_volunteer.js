const mongoose = require('mongoose');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Volunteer = require('./models/Volunteer');

// Connect to DB directly to create user
mongoose.connect('mongodb://localhost:27017/charity_app')
    .then(() => console.log('Connected to DB for setup'))
    .catch(err => {
        console.error('DB Connection Error:', err);
        process.exit(1);
    });

const runVerification = async () => {
    try {
        // 1. Create a test user
        const email = `testVolunteer_${Date.now()}@example.com`;
        // Clean up if exists (unlikely with unique email)

        const user = await User.create({
            fullName: 'Test Volunteer',
            email: email,
            password: 'password123',
            role: 'user'
        });

        console.log(`User created: ${user.email}`);

        // 2. Generate Token
        const token = jwt.sign({ id: user._id }, 'supersecret', {
            expiresIn: '1d' // matches default logic implied
        });

        console.log('Token generated');

        // 3. Send Request
        const applicationData = {
            phone: '123-456-7890',
            skillset: ['coding', 'teaching'],
            availability: 'weekends',
            interests: ['education', 'tech'],
            message: 'I want to help!'
        };

        try {
            const response = await axios.post('http://localhost:5000/api/volunteers/apply', applicationData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('API Response Status:', response.status);
            console.log('API Response Data:', response.data);

            if (response.status === 201 && response.data.success) {
                console.log('✅ Volunteer Application Successful');
            } else {
                console.log('❌ Volunteer Application Failed (Unexpected status)');
            }

        } catch (apiError) {
            console.error('❌ API Call Failed:', apiError.response ? apiError.response.data : apiError.message);
        }

        // 4. Verify in DB
        const volunteer = await Volunteer.findOne({ userId: user._id });
        if (volunteer) {
            console.log('✅ Volunteer record found in DB:', volunteer._id);
            console.log('Status:', volunteer.status);
        } else {
            console.log('❌ Volunteer record NOT found in DB');
        }

    } catch (err) {
        console.error('Verification Script Error:', err);
    } finally {
        await mongoose.connection.close();
    }
};

// Wait for server to potentially start if run concurrently, but here we run script separately.
// Ideally verification script runs AFTER server is up.
runVerification();
