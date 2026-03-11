// Show/hide forms
function showForm(formType) {
    // Hide both forms first
    document.getElementById('early-form').style.display = 'none';
    document.getElementById('enrollment-form').style.display = 'none';
    
    // Show the selected form
    if (formType === 'early') {
        document.getElementById('early-form').style.display = 'block';
    } else if (formType === 'enrollment') {
        document.getElementById('enrollment-form').style.display = 'block';
    }
    
    // Scroll to the form
    document.getElementById('forms-container').scrollIntoView({ behavior: 'smooth' });
}

function hideForms() {
    document.getElementById('early-form').style.display = 'none';
    document.getElementById('enrollment-form').style.display = 'none';
}

// Print form
function printForm(formId) {
    const form = document.getElementById(formId);
    const originalDisplay = form.style.display;
    
    // Temporarily show form if hidden
    form.style.display = 'block';
    
    // Print
    window.print();
    
    // Restore original display
    form.style.display = originalDisplay;
}

// Form submission
function submitForm(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    
    // Collect all form data
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Get checkbox values that weren't captured
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(cb => {
        if (!data[cb.name]) {
            data[cb.name] = [];
        }
        if (Array.isArray(data[cb.name])) {
            if (!data[cb.name].includes(cb.value)) {
                data[cb.name].push(cb.value);
            }
        }
    });
    
    // Log form data (replace with actual submission)
    console.log('Form submitted:', formType, data);
    
    // Show success message
    showSuccessMessage(form);
    
    // Optional: Reset form
    // form.reset();
}

// Show success message
function showSuccessMessage(form) {
    // Remove any existing success message
    const existingMsg = form.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create success message
    const msg = document.createElement('div');
    msg.className = 'success-message';
    msg.innerHTML = '<strong>Success!</strong> Form submitted successfully!';
    
    // Insert before buttons
    const buttons = form.querySelector('.form-buttons');
    form.insertBefore(msg, buttons);
    
    // Remove after 3 seconds
    setTimeout(() => {
        msg.remove();
    }, 3000);
}

// Conditional field handlers
document.addEventListener('DOMContentLoaded', function() {
    
    // Early Registration - Indigenous Peoples
    const indigenousRadios = document.querySelectorAll('input[name="indigenous"]');
    indigenousRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const detailInput = this.closest('.radio-group').querySelector('input[name="indigenousDetail"]');
            if (this.value === 'yes') {
                detailInput.style.display = 'inline-block';
                detailInput.required = true;
            } else {
                detailInput.style.display = 'none';
                detailInput.required = false;
                detailInput.value = '';
            }
        });
    });
    
    // Early Registration - PWD
    const pwdRadios = document.querySelectorAll('input[name="pwd"]');
    pwdRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const detailInput = this.closest('.radio-group').querySelector('input[name="pwdDetail"]');
            if (this.value === 'yes') {
                detailInput.style.display = 'inline-block';
                detailInput.required = true;
            } else {
                detailInput.style.display = 'none';
                detailInput.required = false;
                detailInput.value = '';
            }
        });
    });
    
    // Enrollment - 4Ps
    const fourPsRadios = document.querySelectorAll('input[name="fourPs"]');
    fourPsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const idInput = document.querySelector('input[name="fourPsId"]');
            if (this.value === 'yes') {
                idInput.style.display = 'block';
                idInput.required = true;
            } else {
                idInput.style.display = 'none';
                idInput.required = false;
                idInput.value = '';
            }
        });
    });
    
    // Enrollment - Same Address
    const sameAddressRadios = document.querySelectorAll('input[name="sameAddress"]');
    sameAddressRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const permAddress = document.querySelector('.conditional-address');
            if (this.value === 'no') {
                permAddress.style.display = 'block';
            } else {
                permAddress.style.display = 'none';
            }
        });
    });
    
    // Enrollment - Special Needs
    const specialNeedsRadios = document.querySelectorAll('input[name="specialNeeds"]');
    specialNeedsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const section = document.querySelector('.conditional-section');
            if (this.value === 'yes') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // Enrollment - Returning Learner
    const returningCheckbox = document.querySelector('input[name="returningLearner"]');
    if (returningCheckbox) {
        returningCheckbox.addEventListener('change', function() {
            const grid = document.querySelector('.conditional-grid');
            if (this.checked) {
                grid.style.display = 'grid';
            } else {
                grid.style.display = 'none';
            }
        });
    }
    
    // Early Learning Program checkbox detail
    const earlyLearningCheckboxes = document.querySelectorAll('input[name="earlyLearning"]');
    earlyLearningCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            const detailInput = this.closest('.form-group').querySelector('input[name="earlyLearningDetail"]');
            if (this.checked) {
                detailInput.style.display = 'block';
            } else {
                detailInput.style.display = 'none';
                detailInput.value = '';
            }
        });
    });
    
    // Initialize conditional fields
    initializeConditionalFields();
});

// Initialize all conditional fields on page load
function initializeConditionalFields() {
    // Hide all conditional inputs initially
    const conditionalInputs = document.querySelectorAll('.inline-input, input[name="fourPsId"], .conditional-input');
    conditionalInputs.forEach(input => {
        input.style.display = 'none';
    });
    
    // Hide conditional sections
    const conditionalSections = document.querySelectorAll('.conditional-section, .conditional-grid, .conditional-address');
    conditionalSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Hide early learning detail inputs
    const earlyLearningDetails = document.querySelectorAll('input[name="earlyLearningDetail"]');
    earlyLearningDetails.forEach(input => {
        input.style.display = 'none';
    });
}

// Form validation helper
function validateRequired(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            field.style.borderColor = '#ccc';
        }
    });
    
    return isValid;
}

// Clear error on input
document.addEventListener('input', function(e) {
    if (e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '#ccc';
        }
    }
});
