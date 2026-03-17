import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import type {
  ContentItem,
  ContentPriority,
  ContentStatus,
  ContentType,
  Platform,
} from '../../features/content/types/content';

import type { ContentFormValues } from '../../features/content/types/contentForm';

// type ContentFormValues = {
//   title: string;
//   slug: string;
//   summary: string;
//   contentType: ContentType;
//   status: ContentStatus;
//   priority: ContentPriority;
//   platform: Platform;
//   dueDate: string;
//   publishDate: string;
//   notes: string;
//   tags: string;
// };

type ContentFormDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: ContentItem;
  onClose: () => void;
  onSubmit: (values: ContentFormValues) => void;
  isSubmitting?: boolean;
};

const statusOptions: ContentStatus[] = [
  'idea',
  'pitching',
  'assigned',
  'drafting',
  'editing',
  'scheduled',
  'published',
  'archived',
];

const priorityOptions: ContentPriority[] = ['low', 'medium', 'high', 'urgent'];

const typeOptions: ContentType[] = [
  'album-review',
  'interview',
  'festival-preview',
  'festival-review',
  'concert-review',
  'news',
  'feature',
  'social-post',
];

const platformOptions: Platform[] = [
  'website',
  'instagram',
  'facebook',
  'bluesky',
  'newsletter',
  'youtube',
];

const defaultValues: ContentFormValues = {
  title: '',
  slug: '',
  summary: '',
  contentType: 'news',
  status: 'idea',
  priority: 'medium',
  platform: 'website',
  dueDate: '',
  publishDate: '',
  notes: '',
  tags: '',
};

export default function ContentFormDialog({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ContentFormDialogProps) {
  const { control, handleSubmit, reset, watch, setValue } =
    useForm<ContentFormValues>({
      defaultValues,
    });

  const watchedTitle = watch('title');

  useEffect(() => {
    if (open && initialValues) {
      reset({
        title: initialValues.title,
        slug: initialValues.slug,
        summary: initialValues.summary,
        contentType: initialValues.contentType,
        status: initialValues.status,
        priority: initialValues.priority,
        platform: initialValues.platform,
        dueDate: initialValues.dueDate ?? '',
        publishDate: initialValues.publishDate ?? '',
        notes: initialValues.notes ?? '',
        tags: initialValues.tags.join(', '),
      });
      return;
    }

    if (open) {
      reset(defaultValues);
    }
  }, [open, initialValues, reset]);

  useEffect(() => {
    if (mode === 'create') {
      const generatedSlug = watchedTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      setValue('slug', generatedSlug);
    }
  }, [mode, watchedTitle, setValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        {mode === 'create' ? 'Create Content Item' : 'Edit Content Item'}
      </DialogTitle>

      <DialogContent dividers>
        <Stack
          spacing={2}
          component='form'
          id='content-form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 1 }}
        >
          <Controller
            name='title'
            control={control}
            rules={{ required: 'Title is required.' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Title'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name='slug'
            control={control}
            rules={{ required: 'Slug is required.' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Slug'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name='summary'
            control={control}
            rules={{ required: 'Summary is required.' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Summary'
                fullWidth
                multiline
                minRows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name='contentType'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Content Type' select fullWidth>
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Status' select fullWidth>
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name='priority'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Priority' select fullWidth>
                  {priorityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name='platform'
              control={control}
              render={({ field }) => (
                <TextField {...field} label='Platform' select fullWidth>
                  {platformOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Controller
              name='dueDate'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Due Date'
                  type='date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name='publishDate'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Publish Date'
                  type='date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Stack>

          <Controller
            name='tags'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Tags'
                fullWidth
                helperText='Separate tags with commas.'
              />
            )}
          />

          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Notes'
                fullWidth
                multiline
                minRows={4}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button
          type='submit'
          form='content-form'
          variant='contained'
          disabled={isSubmitting}
        >
          {mode === 'create' ? 'Create' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
