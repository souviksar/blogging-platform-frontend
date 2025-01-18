export const EErrors = {
  firstName: [
    { type: 'whitespace', message: 'First name is required' },
    { type: 'pattern', message: 'First name should not include special characters or number' }
  ],
  lastName: [
    { type: 'whitespace', message: 'Last name is required' },
    { type: 'pattern', message: 'Last name should not include special characters or number' }
  ],
  email: [
    { type: 'whitespace', message: 'Email is required' },
    { type: 'invalidEmail', message: 'Please enter a valid email' }
    // { type: 'invalidDomain', message: 'Only @onlygenuine.co and @weavers-web.com are allowed' }
  ],
  employeeId: [{ type: 'whitespace', message: 'Employee Id is required' }],
  passcode: [{ type: 'required', message: 'Enter a six digit Passcode' }],
  event_passcode: [{ type: 'required', message: 'Enter a six digit Passcode' }],
  event_name: [
    { type: 'whitespace', message: 'Name is required' },
    { type: 'pattern', message: 'Event Name should not include special characters or number' }
  ],
  newPassword: [
    { type: 'required', message: 'Password is required' },
    {
      type: 'pattern',
      message:
        'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )'
    },
    { type: 'passwordSame', message: 'New password must be different from current password' }
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'passwordNoMatch', message: 'Confirm password mismatch' }
  ],
  password: [{ type: 'required', message: 'Password is required' }],
  currentPassword: [{ type: 'required', message: 'Current password is required' }],
  otp: [
    { type: 'required', message: 'OTP is required' },
    { type: 'mask', message: 'Please provide valid OTP' }
  ],
  usage: [{ type: 'whitespace', message: 'Usage is required' }],
  type: [{ type: 'required', message: 'Type is required' }],
  name: [
    { type: 'whitespace', message: 'Name is required' },
    { type: 'pattern', message: 'Name should not include special characters or number' }
  ],
  color: [{ type: 'whitespace', message: 'Color is required' }],
  point: [{ type: 'required', message: 'Point is required' }],
  staff: [{ type: 'required', message: 'Please select a staff' }],
  session: [{ type: 'required', message: 'Please select a session' }],
  event_location: [{ type: 'whitespace', message: 'Location is required' }],
  event_desc: [{ type: 'whitespace', message: 'Event description is required' }],
  event_date: [{ type: 'required', message: 'Please select a date' }],
  event_start_date: [{ type: 'required', message: 'Please select a start date' }],
  event_end_date: [
    { type: 'required', message: 'Please select a end date' },
    {
      type: 'startDateAfterEndDate',
      message: 'End date must be after the start date'
    }
  ],
  event_currency: [
    { type: 'whitespace', message: 'Currency is required' },
    { type: 'maxlength', message: 'Currency should be max 3 characters long' }
  ],
  title: [{ type: 'whitespace', message: 'Title is required' }],
  content: [{ type: 'whitespace', message: 'Content is required' }]
} as const;
