import { categoryOptions, ComicFormProps, schemaComic } from '@/pages/Comic/Comic.state';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Stack, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ComicAddDetailForm from './ComicAddDetailForm';
import ComicCategoryForm from './ComicCategoryForm';

const ComicNewForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const defaultValues = useMemo<ComicFormProps>(
    () => ({
      createdBy: undefined,
      type: categoryOptions[0].value,
      name: '',
      preface: '',
      amountOfReadings: undefined,
      coverImage: '',
      language: undefined,
      hasAdult: false,
      listGenreId: [],
    }),
    []
  );

  const methods = useForm<ComicFormProps>({
    resolver: zodResolver(schemaComic),
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const onSubmit = useCallback((data: ComicFormProps) => {
    console.log('Form data: ', data);
    if (data) {
      // Call API here
    }
  }, []);

  const steps = useMemo(() => {
    return [
      {
        label: 'Category',
        content: <ComicCategoryForm onNext={handleNext} />,
      },
      {
        label: 'Detail',
        content: <ComicAddDetailForm onBack={handleBack} onNext={handleSubmit(onSubmit)} />,
      },
    ];
  }, [handleBack, handleNext, handleSubmit, onSubmit]);

  return (
    <FormProvider {...methods}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            p: {
              xs: 4,
              sm: 6,
              md: 8,
            },
          }}
        >
          <Stack maxWidth="sm" spacing={3}>
            <Typography variant="h4">Create Manga Section</Typography>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                '& .MuiStepConnector-line': {
                  borderLeftColor: 'divider',
                  borderLeftWidth: 2,
                  ml: 1,
                },
              }}
            >
              {steps.map((step, index) => {
                const isCurrentStep = activeStep === index;

                return (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography sx={{ ml: 2 }} variant="overline">
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent
                      sx={{
                        borderLeftColor: 'divider',
                        borderLeftWidth: 2,
                        ml: '20px',
                        ...(isCurrentStep && {
                          py: 4,
                        }),
                      }}
                    >
                      {step.content}
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ComicNewForm;
