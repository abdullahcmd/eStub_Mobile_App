import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Icon} from '../common';
import {TextField, TextFieldProps} from './TextField';

/** TextField with a show/hide toggle. */
export const PasswordField = (props: Omit<TextFieldProps, 'accessory' | 'secureTextEntry'>) => {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      autoCapitalize="none"
      autoCorrect={false}
      textContentType="password"
      {...props}
      secureTextEntry={!visible}
      accessory={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          hitSlop={8}
          onPress={() => setVisible(v => !v)}>
          <Icon name={visible ? 'eye-off' : 'eye'} color="textSecondary" />
        </Pressable>
      }
    />
  );
};
