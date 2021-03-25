/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export const PhotoForm = (props) => {
  const { handleSubmit, handlePhoto } = props;

  return (
    <div css={containerCSS}>
      <form onSubmit={handleSubmit}>
        <label css={labelCSS}>
          Click here to choose a photo
          <input
            css={inputCSS}
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          ></input>
        </label>
        <button css={photoButtonCSS} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const photoButtonCSS = css`
  background-color: white;
  margin-left: 40px;
  cursor: pointer;

`;

const inputCSS = css`
  display: none;
`;

const labelCSS = css`
  cursor: pointer;
`;

const containerCSS = css`
  margin-top: 50px;
`;
