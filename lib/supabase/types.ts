export interface Service {
  id: string
  slug: string
  title: string
  short_description: string
  long_description: string
  icon: string
  color: string
  features: string[]
  benefits: string[]
  use_cases: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  message: string
  service_interest?: string
  status: string
  created_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  subscribed_at: string
  status: string
}
