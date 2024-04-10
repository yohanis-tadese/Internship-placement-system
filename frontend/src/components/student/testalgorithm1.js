// Define weights for different factors
const WEIGHT_PREFERENCE = 0.4;
const WEIGHT_DISABILITY = 0.2;
const WEIGHT_GENDER = 0.1;
const WEIGHT_COMPANY_VALUE = 0.2;
const WEIGHT_STUDENT_GRADE = 0.1;

// Function to calculate the weighted score for a student-company pair
const calculateWeightedScore = (student, company) => {
  let score = 0;

  // Calculate preference score
  const preferenceScore =
    WEIGHT_PREFERENCE * (5 - student.preferences.indexOf(company.company_id));
  score += preferenceScore;

  // Calculate disability match score
  const disabilityScore =
    student.disability === company.requiresDisability ? WEIGHT_DISABILITY : 0;
  score += disabilityScore;

  // Calculate gender match score
  const genderScore =
    student.gender === company.requiresGender ? WEIGHT_GENDER : 0;
  score += genderScore;

  // Calculate company value score (assuming companies have a value property)
  const companyValueScore = company.value * WEIGHT_COMPANY_VALUE;
  score += companyValueScore;

  // Calculate student grade score (assuming students have a grade property)
  const studentGradeScore = student.grade * WEIGHT_STUDENT_GRADE;
  score += studentGradeScore;

  return score;
};

// Function to match students with companies
const matchStudentsWithCompanies = (students, companies) => {
  const studentCompanyMatches = {};

  students.forEach((student) => {
    let bestMatch = null;
    let bestScore = -Infinity;

    companies.forEach((company) => {
      // Check if the company has available slots
      if (company.availableSlots > 0) {
        const score = calculateWeightedScore(student, company);
        if (score > bestScore) {
          bestMatch = company;
          bestScore = score;
        }
      }
    });

    if (bestMatch) {
      if (!studentCompanyMatches[bestMatch.company_id]) {
        studentCompanyMatches[bestMatch.company_id] = [];
      }
      studentCompanyMatches[bestMatch.company_id].push(student.student_id);
      bestMatch.availableSlots--;
    }
  });

  return studentCompanyMatches;
};

// Example usage
const studentData = [
  {
    student_id: 1,
    name: "John Doe",
    disability: false,
    gender: "male",
    preferences: [2, 3, 4, 1, 5],
    grade: 85,
  },
  {
    student_id: 2,
    name: "Jane Smith",
    disability: true,
    gender: "female",
    preferences: [4, 1, 5, 3, 2],
    grade: 75,
  },
  // Add more student data...
];

const companyData = [
  {
    company_id: 1,
    company_name: "A.A Hawasa",
    location: "Hawasa",
    requiresDisability: false,
    requiresGender: "male",
    value: 9,
    availableSlots: 2,
  },
  {
    company_id: 2,
    company_name: "B.B Addis Ababa",
    location: "Addis Ababa",
    requiresDisability: false,
    requiresGender: "female",
    value: 8,
    availableSlots: 1,
  },
  // Add more company data...
];

const matches = matchStudentsWithCompanies(studentData, companyData);
console.log(matches);
