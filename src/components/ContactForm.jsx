import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '../schemas/contactFormSchema'
import './ContactForm.css'

function createFormEntry(data) {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)

  return {
    id,
    ...data,
    submittedAt: new Date().toISOString(),
  }
}

export function ContactForm({ onSubmitSuccess }) {
  const [successMessage, setSuccessMessage] = useState('')

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onTouched',
  })

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' }) || ''

  const handleFormSubmit = async (data) => {
    try {
      const entry = createFormEntry(data)

      if (onSubmitSuccess) {
        await onSubmitSuccess(entry)
      }

      reset()
      setSuccessMessage('Thank you! Your message has been successfully submitted.')
    } catch {
      // In case of submission errors, keep user inputs intact
    }
  }

  const handleReset = () => {
    reset()
    setSuccessMessage('')
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Send Us a Message</h2>
        <p>Fill out the form below and we will get back to you promptly.</p>
      </div>

      {successMessage && (
        <div className="alert-success" role="status" aria-live="polite">
          <div className="alert-content">
            <svg
              className="alert-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            className="alert-dismiss"
            onClick={() => setSuccessMessage('')}
            aria-label="Dismiss message"
          >
            &times;
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="contact-form"
        aria-label="Contact form"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              className={errors.name ? 'input-error' : ''}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-error" className="error-text" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. alex@example.com"
              className={errors.email ? 'input-error' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="error-text" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            Subject <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder="e.g. Capstone Project Feedback"
            className={errors.subject ? 'input-error' : ''}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            {...register('subject')}
          />
          {errors.subject && (
            <p id="subject-error" className="error-text" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="message">
              Message <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <span
              className={`char-count ${messageValue.length > 1000 ? 'char-limit-exceeded' : ''}`}
              aria-live="polite"
            >
              {messageValue.length} / 1000
            </span>
          </div>
          <textarea
            id="message"
            rows={5}
            placeholder="Type your message here (at least 10 characters)..."
            className={errors.message ? 'input-error' : ''}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            {...register('message')}
          />
          {errors.message && (
            <p id="message-error" className="error-text" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Message'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
