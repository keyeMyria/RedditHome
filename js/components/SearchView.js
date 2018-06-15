import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchView = ({search, onSearchChange}) => {
    return (
        <View style={styles.container}>
            <Icon size={25} name={'search'} color='#ccc'/>
            <TextInput
                onChangeText={onSearchChange}
                value={search}
                multiline={false}
                placeholderTextColor={'#ccc'}
                placeholder={'Search'}
                style={styles.textInput}
            />
        </View>);
};

SearchView.propTypes = {
    search: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired
};

export default SearchView;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    textInput: {
        fontSize: 18,
        flex: 1,
        marginLeft: 6
    }
});