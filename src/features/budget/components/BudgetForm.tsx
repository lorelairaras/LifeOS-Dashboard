import { useState, useEffect } from 'react'
import type { BudgetEntry, EntryType } from '@/types'
import type { BudgetInput } from '@/features/budget/hooks/useBudget'
import { CATEGORY_OPTIONS } from '@/features/budget/data/budgetCategories'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Button from '@/components/Button'

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
]

type FormState = {
  title: string
  amount: string
  type: string
  category: string
  date: string
  notes: string
}

const DEFAULT_FORM: FormState = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Other',
  date: '',
  notes: '',
}

interface BudgetFormProps {
  initialEntry?: BudgetEntry
  onSubmit: (data: BudgetInput) => void
  onCancel: () => void
}

export default function BudgetForm({ initialEntry, onSubmit, onCancel }: BudgetFormProps) {
  const [form, setForm] = useState<FormState>(
    initialEntry
      ? {
          title: initialEntry.title,
          amount: String(initialEntry.amount),
          type: initialEntry.type,
          category: initialEntry.category,
          date: initialEntry.date,
          notes: initialEntry.notes ?? '',
        }
      : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(
      initialEntry
        ? {
            title: initialEntry.title,
            amount: String(initialEntry.amount),
            type: initialEntry.type,
            category: initialEntry.category,
            date: initialEntry.date,
            notes: initialEntry.notes ?? '',
          }
        : DEFAULT_FORM
    )
    setErrors({})
  }, [initialEntry])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (!form.title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (!form.amount.trim()) {
      newErrors.amount = 'Amount is required.'
    } else if (Number(form.amount) <= 0 || isNaN(Number(form.amount))) {
      newErrors.amount = 'Amount must be a positive number.'
    }
    if (!form.category) {
      newErrors.category = 'Category is required.'
    }
    if (!form.date) {
      newErrors.date = 'Date is required.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      title: form.title.trim(),
      amount: Number(form.amount),
      type: form.type as EntryType,
      category: form.category,
      date: form.date,
      notes: form.notes.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <FormField label="Title" htmlFor="budget-title" error={errors.title} required>
          <Input
            id="budget-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. Freelance payment, Rent..."
            error={errors.title}
            autoFocus
            aria-required="true"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Amount" htmlFor="budget-amount" error={errors.amount} required>
            <Input
              id="budget-amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              placeholder="0.00"
              error={errors.amount}
              aria-required="true"
            />
          </FormField>
          <FormField label="Type" htmlFor="budget-type">
            <Select
              id="budget-type"
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
              options={TYPE_OPTIONS}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Category" htmlFor="budget-category" error={errors.category} required>
            <Select
              id="budget-category"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              options={CATEGORY_OPTIONS}
            />
          </FormField>
          <FormField label="Date" htmlFor="budget-date" error={errors.date} required>
            <Input
              id="budget-date"
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              error={errors.date}
              aria-required="true"
            />
          </FormField>
        </div>

        <FormField label="Notes" htmlFor="budget-notes">
          <Textarea
            id="budget-notes"
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Optional notes..."
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {initialEntry ? 'Save Changes' : 'Add Entry'}
          </Button>
        </div>
      </div>
    </form>
  )
}
