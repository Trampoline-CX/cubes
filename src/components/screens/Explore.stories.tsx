import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { FakeScreen } from '../../storybook/decorators/FakeScreen'
import { Box } from '../structure/Box/Box'
import { SearchField } from '../forms/SearchField/SearchField'
import { DisplayText } from '../text/DisplayText/DisplayText'
import { Divider } from '../structure/Divider/Divider'
import { BodyText } from '../text/BodyText/BodyText'
import { Stack } from '../structure/Stack/Stack'
import { Pill } from '../actions/Pill/Pill'
import { useStyles } from '../../theme'
import { Touchable } from '../base/Touchable/Touchable'
import { getStoryTitle } from '../../storybook/get-story-title'

export const Explore: React.FC = () => {
  const [query, setQuery] = useState('')

  const showQuickSelects = query.length === 0
  const showResults = query.length > 0 && query.length < 8
  const showNoResults = query.length && query.length >= 8

  return (
    <>
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

          <Box paddingX="medium">
            <Stack space="small" align="start">
              <QuickSelectPill onSelect={setQuery} value="uber" />
              <QuickSelectPill onSelect={setQuery} value="tim hortons" />
              <QuickSelectPill onSelect={setQuery} value="netflix" />
              <QuickSelectPill onSelect={setQuery} value="hydro quebec" />
            </Stack>
          </Box>
        </>
      )}

      {showResults && (
        <>
          <Box padding="medium">
            <Stack horizontal>
              <Box fill>
                <BodyText variation="strong">4 matches</BodyText>
              </Box>
              <BodyText variation="strong">Total $80.00</BodyText>
            </Stack>
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
    </>
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
      <Stack horizontal align="center">
        <Box paddingY="small" paddingX="medium">
          <View style={styles.date} />
        </Box>

        <Box fill>
          <BodyText>{name}</BodyText>
        </Box>

        <Box paddingRight="medium">
          <BodyText>{amount}</BodyText>
        </Box>
      </Stack>
    </Touchable>
  )
}

export default {
  title: getStoryTitle(fileAbsolute),
  component: Explore,
  decorators: [FakeScreen],
}
