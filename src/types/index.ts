export interface Program {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  image: string;
  schedule: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  relation: string;
  image: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}