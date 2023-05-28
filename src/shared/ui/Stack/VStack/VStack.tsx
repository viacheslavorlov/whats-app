import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: HStackProps) => {
    const { children, align = 'start' } = props;
    return (
        <Flex direction="column" align={align} {...props}>
            {children}
        </Flex>
    );
};
