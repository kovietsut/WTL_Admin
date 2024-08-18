import {
  Grid,
  Stack,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import ComicAddDetailForm from './ComicAddDetailForm';
import ComicCategoryForm from './ComicCategoryForm';
import ComicPreview from './ComicPreview';

const ComicNewForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = useMemo(() => {
    return [
      {
        label: 'Category',
        content: <ComicCategoryForm onNext={handleNext} />,
      },
      {
        label: 'Detail',
        content: <ComicAddDetailForm onBack={handleBack} onNext={handleComplete} />,
      },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <ComicPreview />;
  }

  return (
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
                  <StepLabel StepIconComponent={StepIcon}>
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
  );
};

export default ComicNewForm;
