export default [
  {
    group: 'Button',
    name: 'Primary',
    code: `<Button primary>Primary</Button>`,
  },
  {
    group: 'Button',
    name: 'Secondary',
    code: `<Button>Secondary</Button>`,
  },
  {
    group: 'Screen',
    name: 'With Bottom Navigation Bar',
    code: `
    <Screen>
      <TopBar title="Bar Title" />
      <Screen.Content padding="medium">
        <TextContainer>
          <DisplayText>Title</DisplayText>
          <BodyText>Put content here...</BodyText>
        </TextContainer>
      </Screen.Content>
      <BottomNavigationBar>
        <BottomNavigationBar.Tab icon="dashboard" selected />
        <BottomNavigationBar.Tab icon="account-balance" />
        <BottomNavigationBar.Tab icon="person" />
      </BottomNavigationBar>
    </Screen>
    `,
  },
]
