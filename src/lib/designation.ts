export const designationPriority: Record<string, number> = {
  "Counselor": 1,
  "Advisor": 2,
  "Alumni": 3,
  "Senior Member": 4,
  "Chairperson": 5,
  "Vice Chairperson": 6,
  "General Secretary": 7,
  "Assistant General Secretary": 8,
  "Treasurer": 9,
  "Webmaster": 10,
  "Program Coordinator": 11,
  "Graphic Designer": 12,
  "Content Development": 13,
  "Membership Development": 14,
  "Public Relation Coordinator": 15,
  "Photographer": 16,
  "Publication Coordinator": 17,
  "Volunteer": 18,
  "Other": 19,
};

export const getDesignationPriority = (designation?: string): number => {
  if (!designation) return designationPriority["Other"];
  return designationPriority[designation] || designationPriority["Other"];
};

export const sortUsersByDesignation = (users: any[], society?: string) => {
  return [...users].sort((a, b) => {
    let priorityA = getDesignationPriority(a.position || "Member");
    let priorityB = getDesignationPriority(b.position || "Member");
    
    // If society context is provided, check for society-specific designation
    if (society) {
      const societyDesignationA = a.society_designations?.find((sd: any) => sd.society === society)?.designation;
      const societyDesignationB = b.society_designations?.find((sd: any) => sd.society === society)?.designation;
      
      if (societyDesignationA) {
        priorityA = getDesignationPriority(societyDesignationA);
      }
      if (societyDesignationB) {
        priorityB = getDesignationPriority(societyDesignationB);
      }
    }

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Secondary sort by name
    return (a.name || "").localeCompare(b.name || "");
  });
};
