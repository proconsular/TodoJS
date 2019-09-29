import { mergeStyleSets } from "@uifabric/merge-styles"

export const TaskStyle = () => {
    return mergeStyleSets({
        task: {
            border: "2px solid #999",
            color: "#444",
            borderRadius: 6,
            padding: 16,
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            fontSize: 32,
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            boxShadow: '0px 0px 3px 1px #2221',
            selectors: {
                'i': {
                    fontSize: 42,
                    padding: '0 !important',
                    margin: '0 !important'
                },
                'div': {
                    padding: '0 !important',
                    margin: '0 !important',
                },
                ':hover': {
                    border: '2px solid #444',
                }
            }
        },
    })
}