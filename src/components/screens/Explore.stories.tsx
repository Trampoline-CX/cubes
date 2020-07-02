import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { Box } from '../structure/Box/Box'
import { SearchField } from '../forms/SearchField/SearchField'
import { DisplayText } from '../text/DisplayText/DisplayText'
import { Divider } from '../structure/Divider/Divider'
import { BodyText } from '../text/BodyText/BodyText'
import { Pill } from '../actions/Pill/Pill'
import { useStyles } from '../../theme'
import { Touchable } from '../base/Touchable/Touchable'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Screen } from '../structure/Screen/Screen'
import { PhoneScreen } from '../../storybook/decorators/PhoneScreen'
import { BottomNavigationBar } from '../navigation/BottomNavigationBar/BottomNavigationBar'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [PhoneScreen],
}

export const Explore: React.FC = () => {
  const [query, setQuery] = useState('')

  const showQuickSelects = query.length === 0
  const showResults = query.length > 0 && query.length < 8
  const showNoResults = query.length && query.length >= 8

  return (
    <Screen>
      <Screen.Content>
        <Box padding="medium" paddingBottom="none">
          <DisplayText>Explore</DisplayText>
        </Box>

        <Box padding="medium">
          <SearchField placeholder="Search by name" value={query} onChange={setQuery} />
        </Box>

        <Divider />

        {showQuickSelects && (
          <>
            <Box padding="medium">
              <BodyText variation="strong">Popular searches</BodyText>
            </Box>

            <Box paddingX="medium" space="small" align="start">
              <QuickSelectPill onSelect={setQuery} value="uber" />
              <QuickSelectPill onSelect={setQuery} value="tim hortons" />
              <QuickSelectPill onSelect={setQuery} value="netflix" />
              <QuickSelectPill onSelect={setQuery} value="hydro quebec" />
            </Box>
          </>
        )}

        {showResults && (
          <>
            <Box horizontal padding="medium">
              <Box fill>
                <BodyText variation="strong">4 matches</BodyText>
              </Box>
              <BodyText variation="strong">Total $80.00</BodyText>
            </Box>

            <Box>
              <SearchItem name="Transaction Title" amount="$20.00" />
              <SearchItem name="Transaction Title" amount="$20.00" />
              <SearchItem name="Transaction Title" amount="$20.00" />
              <SearchItem name="Transaction Title" amount="$20.00" />
            </Box>
          </>
        )}

        {showNoResults === true && (
          <>
            <Box padding="medium">
              <BodyText>No results</BodyText>
            </Box>
          </>
        )}
      </Screen.Content>
      <BottomNavigationBar>
        <BottomNavigationBar.Tab icon="dashboard" onClick={action('Money Tab Clicked')} />
        <BottomNavigationBar.Tab icon="search" selected onClick={action('Explore Tab Clicked')} />
        <BottomNavigationBar.Tab icon="account-circle" onClick={action('Profile Tab Clicked')} />
      </BottomNavigationBar>
    </Screen>
  )
}

const QuickSelectPill: React.FC<{ onSelect: (value: string) => void; value: string }> = ({
  onSelect,
  value,
}) => {
  const onSelectCallback = useCallback(() => onSelect(value), [onSelect, value])
  return <Pill onClick={onSelectCallback}>{value}</Pill>
}

const SearchItem: React.FC<{ name: string; amount: string }> = ({ name, amount }) => {
  const styles = useStyles(theme => ({
    date: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.fill.background.darker,
      borderRadius: theme.radius.medium,
    },
  }))

  return (
    <Touchable>
      <Box horizontal align="center" paddingY="small" paddingX="medium" space="medium">
        <View style={styles.date} />

        <Box fill>
          <BodyText>{name}</BodyText>
        </Box>

        <BodyText>{amount}</BodyText>
      </Box>
    </Touchable>
  )
}
