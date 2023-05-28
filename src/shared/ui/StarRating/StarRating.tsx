import { memo, useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import Star from '../../assets/star.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    size?: number;
    selectedStars?: number;
}
const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, selectedStars = 0, onSelect, size = 30,
    } = props;

    const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => { // ? замыканиенужно для того чтобы
        if (!isSelected) { // ? убрать замыкающую ()=> функцию в
            setCurrentStarCount(starsCount);
        }
    };
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarCount(0);
        }
    };

    const onClick = (starNumber: number) => () => {
        if (!isSelected) {
            setCurrentStarCount(starNumber);
            setIsSelected(true);
            if (onSelect) {
                onSelect(starNumber);
            }
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((star) => (
                <Icon
                    onClick={onClick(star)}
                    onMouseEnter={onHover(star)}
                    onMouseLeave={onLeave}
                    className={classNames(
                        cls.starIcon,
                        { [cls.isSelected]: isSelected },
                        [currentStarCount >= star ? cls.hovered : cls.normal],
                    )}
                    key={star}
                    Svg={Star}
                />
            ))}
        </div>
    );
});
