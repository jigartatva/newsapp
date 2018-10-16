/**
 * Common styles for the whole app
 */
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/common';

export default StyleSheet.create({
    navigationHeader: {
        backgroundColor: "#1FB18A",
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderRightColor: "#fff",
        borderBottomColor: '#CBCBCB',
        elevation: 0,
        shadowOpacity: 0,
    },
    navigationHeaderTitle: {
        textAlign: 'left',
        color: "#000",
        fontSize: 18,
    },//news
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.colorCreamWhite,
        paddingBottom: 20
    },
    navigationWarpper: {
        flexDirection: 'row',
        height: '100%'
    },
    navigationTouch: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 28,
        height: 28
    },
    gridStyle: {
        paddingTop: 20
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 180,
        alignItems: "stretch",
        backgroundColor: COLORS.colorGray
    },
    newsTitleStyle: {
        fontSize: 15,
        color: COLORS.colorWhite,
        fontWeight: '600',
    },//newsdetail    
    imageContainer: {
        width: '100%',
        height: '40%'
    },
    featureImage: {
        width: '100%',
        height: '100%'
    },
    newsDescription: {
        paddingLeft: 20,
        paddingRight: 20
    },
    newsTitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    newsAuthor: {
        fontSize: 12
    },
    newsContent: {
        fontSize: 12,
        marginTop: 10
    },//search    
    innerContainer: {
        flexDirection: 'row',
        height: 65,
        width: '100%',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.colorLightGray,
        borderBottomWidth: 0.8,
        paddingBottom: 5,
        paddingTop: 5
    },
    imageWrapper: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    imageTouch: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageTintColor: {
        tintColor: COLORS.colorBlack
    },
    textInputWrapper: {
        width: '85%',
        height: '95%',
        justifyContent: 'center'
    },
    crossIconWrapper: {
        width: '10%',
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterIconWrapper: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    filterIconStyle: {
        tintColor: COLORS.colorBlack,
        width: 28,
        height: 28
    },
    rowStyle: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    },
    searchContainerStyle: {
        width: "72%",
        height: '100%',
        justifyContent: 'flex-start',
        borderRadius: 10,
        backgroundColor: COLORS.colorLightGray
    },
    textField: {
        fontSize: 16,
        color: COLORS.colorLightBlack
    },
    notFoundStyle: {
        fontSize: 15,
        padding: 10,
        alignSelf: 'center'
    },//cross icon
    croosIconStyle: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    crossImageStyle: {
        resizeMode: 'contain',
        tintColor: COLORS.colorBlack
    }, // List Item
    listItemContainer: {
        flexDirection: 'row',
        padding: 10,
        height: 85,
        width: '100%',
        paddingLeft: 0.1,
        paddingRight: 0.1
    },
    description: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    categoryTextView: {
        width: '80%',
        padding: 15,
        paddingLeft: 1,
        height: '100%',
        justifyContent: 'center'
    },
    checkBoxTouch: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    soundCheckboxView: {
        width: '20%',
        padding: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }, // Model box
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.colorMoreTransparentWhite
    },
    modelImageWrapper: {
        justifyContent: 'center',
        width: '100%',
        height: '10%',
        alignItems: 'flex-end'
    },
    imageWrapperButton: {
        justifyContent: 'center',
        width: '100%',
        height: '10%',
        alignItems: 'center'
    },
    crossImage: {
        width: 24,
        height: 24
    },
    crossImageTouch: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchTouch: {
        width: '95%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.colorGray
    },
    listWrapper: {
        margin: 5,
        backgroundColor: COLORS.colorMoreCreamWhite,
        height: '80%'
    },
    modal: {
        height: '90%',
        opacity: 1,
        borderRadius: 10,
        width: '90%',
        zIndex: 9,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.colorWhite,
        marginTop: '10%',
        padding: 5,
        justifyContent: 'space-between'
    },
    searchText: {
        color: COLORS.colorWhite
    }, // Spinner 
    spinnerContainer: {
        flex: 1,
        backgroundColor: COLORS.colorTransparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    spinnerWrapper: {
        backgroundColor: COLORS.colorTransparentWhite,
        height: 100,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorStyle: {
        flex: 1,
        position: 'absolute',
        top: 20
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.colorTransparentWhite
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    textContent: {
        top: 25,
        color: COLORS.colorWhite,
        fontSize: 20
    }
});