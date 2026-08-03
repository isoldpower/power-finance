import { NoActivityPlaceholderBorder } from './NoActivityPlaceholderBorder.tsx';
import { NoActivityPlaceholderContainer } from './NoActivityPlaceholderContainer.tsx';
import { NoActivityPlaceholderConverted } from './NoActivityPlaceholderConverted.tsx';
import { NoActivityPlaceholderOriginal } from './NoActivityPlaceholderOriginal.tsx';
import { NoActivityPlaceholderTitle } from './NoActivityPlaceholderTitle.tsx';


function NoActivityPlaceholder(){
	return null;
}

NoActivityPlaceholder.displayName = 'NoActivityPlaceholder';
NoActivityPlaceholder.Border = NoActivityPlaceholderBorder;
NoActivityPlaceholder.Container = NoActivityPlaceholderContainer;
NoActivityPlaceholder.Converted = NoActivityPlaceholderConverted;
NoActivityPlaceholder.Original = NoActivityPlaceholderOriginal;
NoActivityPlaceholder.Title = NoActivityPlaceholderTitle;

export { NoActivityPlaceholder };