function skillsMember() {
  var member = {
    name: 'John Doe',
    age: 30,
    skills: ['JavaScript', 'React', 'Node'],
  };

  function getSkills() {
    return member.skills;
  }

  return {
    getSkills,
  };
}