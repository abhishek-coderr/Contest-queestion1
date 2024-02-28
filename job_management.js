const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


//JOB MANAGEMENT
// 1.creating job listing endpoint
let jobs = []
app.post('/api/v1/jobs', (req, res) => {
  const { title, company, location, description } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: 'Title and company are required' });
  }

  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    location: location || '',
    description: description || ''
  };

  jobs.push(newJob);

  res.status(201).json(newJob);
})
// 2.getting all job listing
app.get('/api/v1/job',(req,res)=>{
    res.status(200).json(jobs)
})




//JOB APPLICATION
// 1.applying for a job
const jobApplications=[]
app.post('/api/v1/apply/:jobId', (req, res) => {
    const { jobId } = req.params;
    const { applicantName, applicantEmail, coverLetter } = req.body;
  
    if (!applicantName || !applicantEmail) {
      return res.status(400).json({ error: 'Applicant name and email are required' });
    }
  
    // Dummy implementation to simulate creating a job application
    const newJobApplication = {
      jobId,
      applicantName,
      applicantEmail,
      coverLetter
    };
  
    jobApplications.push(newJobApplication);
  
    res.status(201).json(newJobApplication);
})
// 2.retriving all applications for a job
app.get('/api/jobs/:jobId/applications', (req, res) => {
    const {jobId} = req.params;
  
    const jobApplicationsForJob = jobApplications.filter(application => application.jobId === jobId);
  
    res.status(200).json(jobApplicationsForJob);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
