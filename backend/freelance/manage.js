function acceptApplication(applicationId) {
  console.log(`Application accepted: ${applicationId}`);
}

function rejectApplication(applicationId) {
  console.log(`Application rejected: ${applicationId}`);
}

module.exports = {
  acceptApplication,
  rejectApplication,
};
