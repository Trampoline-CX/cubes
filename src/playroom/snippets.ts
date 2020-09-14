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
  {
    group: 'Screen',
    name: 'With DrawerMenu',
    code: `
    <Screen>
      <TopBar title="Bar Title" withDrawerMenu />
      <DrawerMenu
        items={[
          { label: "Inbox", icon: "email" },
          { label: "Favorites", icon: "favorite" },
          { label: "Trash", icon: "delete" },
        ]}
      />
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
  {
    group: 'Screen',
    name: 'With Carousel',
    code: `
    <Screen>
      <Screen.Content>
        <Carousel style={{ height: 450 }}>
          <Carousel.Slide>
            <TextContainer>
              <DisplayText>Title 1</DisplayText>
              <BodyText>Message 1</BodyText>
            </TextContainer>
          </Carousel.Slide>
          <Carousel.Slide>
            <TextContainer>
              <DisplayText>Title 2</DisplayText>
              <BodyText>Message 2</BodyText>
            </TextContainer>
          </Carousel.Slide>
          <Carousel.Slide>
            <TextContainer>
              <DisplayText>Title 3</DisplayText>
              <BodyText>Message 3</BodyText>
            </TextContainer>
          </Carousel.Slide>
        </Carousel>
      </Screen.Content>
    </Screen>
    `,
  },
  {
    group: 'Screen',
    name: 'With Skeleton Page',
    code: `
    <Screen>
      <Screen.Content padding="medium">
        <SkeletonLoading loading>
          <TextContainer>
            <SkeletonDisplayText />
            <SkeletonBodyText lines={3} />
            <SkeletonBodyText lines={3} />
            <SkeletonHeading />
            <Box horizontal space="medium" align="center">
              <SkeletonAvatar />
              <Box fill>
                <SkeletonBodyText lines={2} />
              </Box>
            </Box>
          </TextContainer>
        </SkeletonLoading>
      </Screen.Content>
    </Screen>
    `,
  },
  {
    group: 'Screen',
    name: 'With Sign-In Form',
    code: `
    <Screen>
      <Screen.Content paddingY="medium">
        <Layout sectioned>
          <FormLayout>
            <TextField
              label="Email"
              type="email"
              placeholder="email@example.com"
            />
            <TextField label="Password" type="password" />
            <Box horizontal align="center" space="medium">
              <Box fill>
                <BodyText>
                  Not a user yet? <Link>Sign up!</Link>
                </BodyText>
              </Box>
              <Button primary>Sign in</Button>
            </Box>
          </FormLayout>
        </Layout>
      </Screen.Content>
    </Screen>
    `,
  },
  {
    group: 'Screen',
    name: 'With ListView',
    code: `
    <Screen>
      <Screen.Content>
        <ListView divider={<Divider />}>
          <ListView.Item
            title="Francis Morin"
            description="Engineer"
            actions={[{ icon: "favorite", color: "accent" }]}
          />
          <ListView.Item
            title="Jonas Chase"
            description="Salesman"
            actions={[{ icon: "favorite" }]}
          />
          <ListView.Item
            title="Caldwell Christensen"
            description="Engineer"
            actions={[{ icon: "favorite" }]}
          />
          <ListView.Item
            title="Griffith Harrell"
            description="CEO"
            actions={[{ icon: "favorite" }]}
          />
          <ListView.Item
            title="Walker James"
            description="Engineer"
            actions={[{ icon: "favorite" }]}
          />
        </ListView>
      </Screen.Content>
    </Screen>
    `,
  },
  {
    group: 'Screen',
    name: 'With Tabs',
    code: `
    <Screen>
      <Tabs tabs={["All", "Favorites"]} selected={0}>
        <Screen.Content>
          <ListView>
            <ListView.Item title="Post 1" description="Lorem ipsum..." />
            <ListView.Item title="Post 2" description="Lorem ipsum..." />
            <ListView.Item title="Post 3" description="Lorem ipsum..." />
            <ListView.Item title="Post 4" description="Lorem ipsum..." />
            <ListView.Item title="Post 5" description="Lorem ipsum..." />
            <ListView.Item title="Post 6" description="Lorem ipsum..." />
            <ListView.Item title="Post 7" description="Lorem ipsum..." />
            <ListView.Item title="Post 8" description="Lorem ipsum..." />
            <ListView.Item title="Post 9" description="Lorem ipsum..." />
            <ListView.Item title="Post 10" description="Lorem ipsum..." />
          </ListView>
        </Screen.Content>
      </Tabs>
    </Screen>
    `,
  },
  {
    group: 'Screen',
    name: 'With Cards',
    code: `
    <Screen>
      <TopBar title="Blog" iconStart="none" />
      <Screen.Content paddingY="medium">
        <Layout>
          <Card sectioned title="Post 1">
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              faucibus sem nisl, at luctus...
            </BodyText>
          </Card>
          <Card sectioned title="Post 2">
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              faucibus sem nisl, at luctus...
            </BodyText>
          </Card>
          <Card sectioned title="Post 3">
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              faucibus sem nisl, at luctus...
            </BodyText>
          </Card>
          <Card title="Highlights this week" mainActions={[{ label: "See all" }]}>
            <Card.Section>
              <BodyText>Lorem ipsum...</BodyText>
            </Card.Section>
            <Card.Section>
              <BodyText>Lorem ipsum...</BodyText>
            </Card.Section>
            <Card.Section>
              <BodyText>Lorem ipsum...</BodyText>
            </Card.Section>
          </Card>
        </Layout>
      </Screen.Content>
    </Screen>
    `,
  },
]
