interface BasicUser {
    loggedIn: true;
    authToken: string;
}

interface CompleteUser extends BasicUser {
    name: string;
    email: string;
}

enum AppPages {
    LOGIN = 'login',
    ACCOUNTS = 'accounts',
    SUPPORT = 'support',
    ERROR_SERVER = 'error-server',
    ERROR_CLIENT = 'error-client',
    ERROR_USER = 'error-user',
}

interface RegularBankAccount {
    name: string,
    IBAN: string,
    currency: 'DKK',
    balance: number,
}

interface PocketBankAccount {
    name: string,
    IBAN: string,
    pockets: { currency: string; balance: number }[]
}

interface SupportChatQueuedWindowed {
    chatSize: 'window';
    timeInQueue?: number; // could potentially disappear after agentConnected = true;
    queueMessage?: string; // i.e "you are 4th in line, please wait"
    busiestDays?: string[];
    leastBusyDays?: string[];
}

interface SupportChatQueuedMinimized {
    chatSize: 'minimized';
    timeInQueue?: number; // could potentially disappear after agentConnected = true;
    queueMessage?: string; // i.e "you are 4th in line, please wait"
    busiestDays?: string[];
    leastBusyDays?: string[];
}

interface SupportChatQueuedFullScreen {
    chatSize: 'full-screen';
    timeInQueue?: number; // could potentially disappear after agentConnected = true;
    queueMessage?: string; // i.e "you are 4th in line, please wait"
    busiestDays?: string[];
    leastBusyDays?: string[];
}

interface SupportChatConnectedFullScreen {
    chatSize: 'full-screen';
    chatHistory: ChatMessage[];
}

interface SupportChatConnectedMinimized {
    chatSize: 'full-screen';
    chatHistory: ChatMessage[];
}

interface SupportChatConnectedWindowed {
    chatSize: 'full-screen';
    chatHistory: ChatMessage[];
}

interface ChatMessage {
    senderName: string;
    senderId: string;
    timeStamp: Date;
    message: string;
}

type User = BasicUser | CompleteUser;

interface ApplicationStateInitial {
    activePage: AppPages.LOGIN;
}
interface ApplicationStateLoggedInBasicUser {
    // user is now logged in, but name and email haven't been fetched yet. The user is free to roam the app.
    user: BasicUser,
    loadingUserDetails: true;
    activePage: AppPages.ACCOUNTS | AppPages.SUPPORT;
    loadingPageDetails: boolean;
    supportChat?: SupportChatQueuedWindowed | SupportChatConnectedWindowed | SupportChatQueuedMinimized | SupportChatConnectedMinimized;
}

interface ApplicationStateLoggedInCompleteUser {
    // name and email has been loaded, user is free to roam the app
    user: CompleteUser,
    activePage: AppPages.ACCOUNTS | AppPages.SUPPORT;
    loadingPageDetails: boolean;
    supportChat?: SupportChatQueuedWindowed | SupportChatConnectedWindowed | SupportChatQueuedMinimized | SupportChatConnectedMinimized;
}

interface ApplicationStateLoadingAccountsPageDetails {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.ACCOUNTS;
    loadingPageData: true;
    supportChat?: SupportChatQueuedWindowed | SupportChatConnectedWindowed | SupportChatQueuedMinimized | SupportChatConnectedMinimized;
}

interface ApplicationStateLoadingSupportPageDetails {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.SUPPORT;
    loadingPageData: true;
    supportChat?: SupportChatQueuedWindowed | SupportChatConnectedWindowed | SupportChatQueuedMinimized | SupportChatConnectedMinimized;
}

interface ApplicationStateAccountsPageLoaded {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.ACCOUNTS;
    accounts: [RegularBankAccount | PocketBankAccount];
    supportChat?: SupportChatQueuedWindowed | SupportChatConnectedWindowed | SupportChatQueuedMinimized | SupportChatConnectedMinimized;
}

interface ApplicationStateSupportPageLoaded {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.SUPPORT;
    // the button to start chat in the UI will create the supportChat when pressed, which contains info like queueTime etc.
    // button visibility would be tied to the existence of chat object.
    supportChat?: SupportChatQueuedFullScreen | SupportChatConnectedFullScreen;
}

interface ApplicationStateServerError {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.ERROR_SERVER; // error page that user sees when application failed to load page details of either Accounts or Support page, due to server error
}

interface ApplicationStateClientError {
    user: User; // user can be either basic or complete
    loadingUserDetails: boolean;
    activePage: AppPages.ERROR_CLIENT; // error page that user sees when application failed to load page details of either Accounts or Support page, due to client error
}

interface ApplicationStateUserDetailsError {
    user: BasicUser;
    loadingUserDetails: false;
    activePage: AppPages.ERROR_USER;
    // error page could either be dedicated error page, or just a section of Accounts and Support pages, but in this case I'm going with dedicated error page
    // that user sees when application fails to load the user details (name, email)
}

type ApplicationSate = ApplicationStateInitial |
    ApplicationStateLoggedInBasicUser |
    ApplicationStateLoggedInCompleteUser |
    ApplicationStateLoadingAccountsPageDetails |
    ApplicationStateLoadingSupportPageDetails |
    ApplicationStateAccountsPageLoaded |
    ApplicationStateSupportPageLoaded |
    ApplicationStateServerError |
    ApplicationStateClientError |
    ApplicationStateUserDetailsError
    ;