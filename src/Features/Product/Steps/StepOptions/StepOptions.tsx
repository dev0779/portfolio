import React from 'react'

import './StepOptions.scss';
import { NumberStepper } from '@/shared/Fields';

export const StepOptions = () => {

  return (
    <div>
      <NumberStepper name="userCount" label="add users"/>
    </div>
  )
}
