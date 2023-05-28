import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => {
    const { children } = props;
    return (
        <Flex direction="row" {...props}>
            {children}
        </Flex>
    );
};
