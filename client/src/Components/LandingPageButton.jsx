import TextButton from "./Buttons/textButton";

export default function LandingPageButton({ id, handleClick, customStyle }) {
    return (
        <TextButton
            id={id}
            handleClick={handleClick}
            type={"landing-page-button"}
            customStyle={customStyle}
        />
    );
}
