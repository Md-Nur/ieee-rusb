export const designationPriority: Record<string, number> = {
  "Counselor": 1,
  "Advisor": 2,
  "Senior member": 3,
  "Alumni": 4,
  "Chairperson": 5,
  "Vice Chair": 6,
  "General Sec": 7,
  "Ass GS": 8,
  "Treasuerer": 9,
  "Webmaster": 10,
  "Programm coordinator": 11,
  "Graphic Designer": 12,
  "Content Development": 13,
  "Membership Development": 14,
  "Public Relation": 15,
  "Photographer": 16,
  "Publication coordinator": 17,
  "Volunteer": 18,
  "Other": 19,
};

export const getDesignationPriority = (designation?: string): number => {
  if (!designation) return designationPriority["Other"];
  return designationPriority[designation] || designationPriority["Other"];
};

export const sortUsersByDesignation = (users: any[]) => {
  return [...users].sort((a, b) => {
    const priorityA = getDesignationPriority(a.position || "Member");
    const priorityB = getDesignationPriority(b.position || "Member");
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Secondary sort by name
    return (a.name || "").localeCompare(b.name || "");
  });
};
