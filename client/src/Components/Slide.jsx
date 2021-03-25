/** @jsxRuntime classic */
/** @jsx jsx */
import { memo } from 'react'
import { css, jsx } from '@emotion/react'

const Slide = ({ id, width }) => {
  return (
    <div
      css={css`
        height: 100%;
        width: ${width}px;
        background-image: url('${`http://localhost:5000/photo/get/${id}`}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `}
    />
  )
}

export default memo(Slide)