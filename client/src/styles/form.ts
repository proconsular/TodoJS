import { mergeStyleSets } from "@uifabric/merge-styles"

export const FormStyle = () => {
    return mergeStyleSets({
        panel: {
            border: '2px solid #555',
            borderRadius: 8,
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 16,
            selectors: {
                'form': {
                    display: 'flex',
                    flexDirection: 'column',
                },
                'input': {
                    marginBottom: 8,
                    fontSize: 32,
                    background: 'none',
                    border: 'none',
                    borderBottom: '2px solid #111'
                },
                'input[type="submit"]': {
                    marginTop: 16,
                    marginBottom: 0,
                    border: 'none',
                    borderRadius: 8,
                    background: '#111',
                    color: '#eee',
                    padding: 4,
                    selectors: {
                        ':hover': {
                            background: '#e44',
                        }
                    }
                },
            }
        }
    })
}
