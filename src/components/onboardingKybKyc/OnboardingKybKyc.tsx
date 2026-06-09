'use client';

import { useCallback, useMemo, useState } from 'react';
import { FormShell } from './layout/FormShell';
import { IntroScreen } from './screens/IntroScreen';
import { PersonaTypeScreen } from './screens/PersonaTypeScreen';
import { ReviewList } from './fields/ReviewList';
import { SuccessScreen } from './screens/SuccessScreen';
import { getSteps } from './steps/stepsConfig';
import { getStepMissing } from './stepStatus';
import { copy } from './copy';
import { initialOnboardingFormData } from './types';
import type {
  OnboardingFormData,
  OnboardingPhase,
  PersonaType,
  UploadedDoc,
} from './types';

export default function OnboardingKybKyc() {
  const [phase, setPhase] = useState<OnboardingPhase>('intro');
  const [personaType, setPersonaType] = useState<PersonaType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);
  const [data, setData] = useState<OnboardingFormData>(
    initialOnboardingFormData
  );

  const update = useCallback((patch: Partial<OnboardingFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateDocument = useCallback((key: string, doc: UploadedDoc | null) => {
    setData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: doc },
    }));
  }, []);

  const steps = useMemo(
    () => (personaType ? getSteps(personaType) : []),
    [personaType]
  );

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleSelectType = useCallback((type: PersonaType) => {
    setPersonaType(type);
    update({ personaType: type });
  }, [update]);

  const handleStartForm = useCallback(() => {
    setActiveIndex(0);
    setMaxReachedIndex(0);
    setPhase('form');
  }, []);

  const handleBack = useCallback(() => {
    if (activeIndex === 0) {
      setPhase('select');
      return;
    }
    setActiveIndex((i) => i - 1);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const isLast = activeIndex === steps.length - 1;
    if (isLast) {
      setPhase('success');
      return;
    }
    const next = activeIndex + 1;
    setActiveIndex(next);
    setMaxReachedIndex((m) => Math.max(m, next));
  }, [activeIndex, steps.length]);

  const handleRestart = useCallback(() => {
    setData(initialOnboardingFormData);
    setPersonaType(null);
    setActiveIndex(0);
    setMaxReachedIndex(0);
    setPhase('intro');
  }, []);

  const stepProps = { data, update, updateDocument };

  if (phase === 'intro') {
    return <IntroScreen onStart={() => setPhase('select')} />;
  }

  if (phase === 'select') {
    return (
      <PersonaTypeScreen
        selected={personaType}
        onSelect={handleSelectType}
        onBack={() => setPhase('intro')}
        onNext={handleStartForm}
      />
    );
  }

  if (phase === 'success') {
    return <SuccessScreen onRestart={handleRestart} />;
  }

  // phase === 'form'
  if (!personaType) return null;

  const current = steps[activeIndex];
  const isReview = current?.id === 'review';
  const formSteps = steps.slice(0, -1);
  const totalMissing = formSteps.reduce(
    (acc, s) => acc + getStepMissing(s.id, data),
    0
  );

  return (
    <FormShell
      personaType={personaType}
      steps={steps}
      activeIndex={activeIndex}
      maxReachedIndex={maxReachedIndex}
      onStepClick={goToStep}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={isReview ? copy.common.submit : copy.common.next}
      nextDisabled={isReview && totalMissing > 0}
    >
      {isReview ? (
        <ReviewList
          steps={formSteps.map((s) => ({ id: s.id, label: s.label }))}
          data={data}
          onEdit={goToStep}
        />
      ) : (
        current?.render(stepProps)
      )}
    </FormShell>
  );
}
